
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Sparkles, Image as ImageIcon, X, SwitchCamera, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import Image from 'next/image';
import type { Product } from '@/lib/types';

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
  product: Product;
}

type View = 'select' | 'loading' | 'result';

const TryOnModal: React.FC<TryOnModalProps> = ({ isOpen, onClose, productImage, product }) => {
  const { toast } = useToast();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
  const [generatedImageSrc, setGeneratedImageSrc] = useState<string | null>(null);
  const [view, setView] = useState<View>('select');
  const [isCameraLive, setIsCameraLive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stopCameraStream = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraLive(false);
    }
  }, []);

  const handleModalClose = useCallback(() => {
    stopCameraStream();
    setUserImageSrc(null);
    setGeneratedImageSrc(null);
    setView('select');
    onClose();
  }, [stopCameraStream, onClose]);
  
  const handleTryOn = async () => {
    if (!userImageSrc) {
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: 'الرجاء تحديد صورة أولاً.',
      });
      return;
    }

    setView('loading');
    toast({
      title: "جاري المعالجة",
      description: "يقوم الذكاء الاصطناعي بمعالجة صورتك يرجى الإنتظار",
      duration: 9000,
    });
    setGeneratedImageSrc(null);

    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userImage: userImageSrc,
          productImage: productImage,
        }),
      });

      if (!response.ok) {
        let errorDetails = 'فشلت العملية. يرجى المحاولة مرة أخرى.';
        try {
           const errorData = await response.json();
           errorDetails = errorData.error || errorDetails;
        } catch (e) {
           // If parsing JSON fails, use the raw text
           errorDetails = await response.text();
        }
        throw new Error(errorDetails);
      }

      const result = await response.json();
      
      if (!result || !result.tryOnImage) {
        throw new Error("لم يتم إرجاع صورة المعاينة الافتراضية.");
      }
      setGeneratedImageSrc(result.tryOnImage);
      setView('result');

    } catch (error) {
      console.error('Try-on failed:', error);
      toast({
        variant: 'destructive',
        title: 'فشلت عملية التجربة',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
        duration: 9000,
      });
      setView('select');
    }
  };


  const getCameraPermission = useCallback(async (mode: 'user' | 'environment') => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        variant: 'destructive',
        title: 'الكاميرا غير مدعومة',
        description: 'متصفحك لا يدعم الوصول إلى الكاميرا.',
      });
      setHasCameraPermission(false);
      return;
    }
    
    stopCameraStream();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: mode } 
      });
      
      const devices = await navigator.mediaDevices.enumerateDevices();
      setVideoDevices(devices.filter(device => device.kind === 'videoinput'));

      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraLive(true);
        setUserImageSrc(null);
      }
    } catch (error) {
      console.error(`Error accessing ${mode} camera:`, error);
      if (mode === 'user' && videoDevices.some(d => d.label.toLowerCase().includes('back'))) {
         // Fallback to environment camera if user camera fails but back camera exists
        setFacingMode('environment');
        getCameraPermission('environment');
      } else {
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'تم رفض الوصول إلى الكاميرا',
          description: 'يرجى تمكين أذونات الكاميرا في إعدادات المتصفح.',
        });
      }
    }
  }, [stopCameraStream, toast, videoDevices]);

  const toggleCamera = () => {
    if (isCameraLive) {
      stopCameraStream();
    } else {
      getCameraPermission(facingMode);
    }
  }

  const switchCamera = () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    getCameraPermission(newFacingMode);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        if (facingMode === 'user') {
          context.translate(video.videoWidth, 0);
          context.scale(-1, 1);
        } else {
          context.translate(0, 0);
          context.scale(1, 1);
        }
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        setUserImageSrc(canvas.toDataURL('image/webp'));
        stopCameraStream();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImageSrc(e.target?.result as string);
        stopCameraStream();
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetSelection = () => {
    setUserImageSrc(null);
    setGeneratedImageSrc(null);
    setView('select');
    stopCameraStream();
    if(fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }


  useEffect(() => {
    if (!isOpen) {
      handleModalClose();
    }
  }, [isOpen, handleModalClose]);
  
   useEffect(() => {
    const getInitialPermissionStatus = async () => {
      if (navigator.permissions) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
          if (permissionStatus.state === 'denied') {
            setHasCameraPermission(false);
          }
          permissionStatus.onchange = () => {
            setHasCameraPermission(permissionStatus.state === 'granted');
          };
        } catch (error) {
            console.error("Permission query failed:", error);
        }
      }
    };
    getInitialPermissionStatus();
  }, []);

  const renderContent = () => {
    switch(view) {
        case 'loading':
            return (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <Loader2 className="h-16 w-16 animate-spin text-accent"/>
                    <p className="text-muted-foreground">يقوم الذكاء الاصطناعي بتجهيز الصورة...</p>
                </div>
            );
        case 'result':
            return (
                <div className="relative w-full h-full">
                    {generatedImageSrc && <Image src={generatedImageSrc} alt="Generated Try-On" layout="fill" objectFit="contain" />}
                </div>
            );
        case 'select':
        default:
            return (
                 <>
                    <video ref={videoRef} className={`w-full h-full object-contain ${isCameraLive ? '' : 'hidden'} ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} autoPlay playsInline muted />
                    
                    {userImageSrc && !isCameraLive && (
                        <>
                            <Image src={userImageSrc} alt="Preview" layout="fill" objectFit="contain" />
                            <Button variant="destructive" size="icon" className="absolute top-2 start-2 z-10 h-8 w-8" onClick={resetSelection}>
                                <X className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                    {isCameraLive && videoDevices.length > 1 && (
                        <Button variant="outline" size="icon" onClick={switchCamera} className="absolute top-2 end-2 z-10 h-8 w-8">
                            <SwitchCamera className="h-4 w-4" />
                        </Button>
                    )}

                    {isCameraLive && !userImageSrc && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                            <Button size="lg" className="rounded-full h-16 w-16 p-0" onClick={captureImage}>
                                <Camera className="h-8 w-8" />
                            </Button>
                        </div>
                    )}

                    {!isCameraLive && !userImageSrc && (
                        <div className="text-center text-muted-foreground p-4">
                            <ImageIcon className="mx-auto h-16 w-16 mb-4 opacity-50"/>
                             <p>اختر صورة للبدء.</p>
                        </div>
                    )}
                    <canvas ref={canvasRef} className="hidden"></canvas>
                 </>
            )
    }
  }

  const renderFooter = () => {
    switch(view) {
        case 'loading':
            return null; // No footer during loading
        case 'result':
             return (
                <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/80" onClick={resetSelection}>
                    تجربة صورة أخرى
                </Button>
            );
        case 'select':
        default:
            return (
                 <Button size="lg" className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white hover:opacity-90" disabled={!userImageSrc} onClick={handleTryOn}>
                    <Sparkles className="me-2 h-4 w-4" />
                    إلبس قبل الشراء
                </Button>
            );
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleModalClose()}>
      <DialogContent className="max-w-4xl w-[90vw] h-auto max-h-[90vh] bg-card text-card-foreground p-0 flex flex-col" dir="rtl">
        <DialogHeader className="p-4 sm:p-6 pb-0 shrink-0">
          <DialogTitle className="text-2xl font-headline text-primary">تجربة المنتج الافتراضية</DialogTitle>
          <DialogDescription>
            ارفع صورتك أو استخدم الكاميرا لترى كيف سيبدو المنتج عليك.
          </DialogDescription>
          <div className="text-red-800 font-semibold mt-2 text-xs sm:text-sm">الصور يتم معالجتها بالذكاء الاصطناعي وهي مشفرة تماماً لايمكن للبشر الوصول اليها</div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 flex-1 min-h-0">
            <div className="flex flex-col justify-between order-2 md:order-1">
                <div>
                    <div className="rounded-lg border bg-background p-4 mb-4">
                        <h3 className="font-bold text-lg mb-2 text-primary">إرشادات الصورة المثالية</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>قف بشكل مستقيم وأمام خلفية بسيطة.</li>
                            <li>تأكد من وجود إضاءة جيدة ومتجانسة.</li>
                            <li>التقط صورة كاملة للجسم للحصول على أفضل نتيجة.</li>
                        </ul>
                    </div>
                    {view === 'select' && (
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" onClick={toggleCamera} disabled={hasCameraPermission === false}>
                                <Camera className="me-2 h-4 w-4" />
                                {isCameraLive ? 'إيقاف الكاميرا' : 'استخدم الكاميرا'}
                            </Button>
                            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="me-2 h-4 w-4" />
                                رفع صورة
                            </Button>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" className="hidden" />
                        </div>
                    )}
                    
                    {hasCameraPermission === false && (
                    <div className="mt-4">
                      <Alert variant="destructive">
                          <AlertTitle>الكاميرا غير متاحة</AlertTitle>
                          <AlertDescription>
                            يرجى السماح بالوصول إلى الكاميرا في إعدادات متصفحك.
                          </AlertDescription>
                      </Alert>
                    </div>
                    )}
                </div>

                <div className="pt-4 border-t mt-4">
                  {renderFooter()}
                </div>
            </div>

            <div className="relative min-h-[300px] md:min-h-[400px] bg-muted rounded-lg flex items-center justify-center overflow-hidden order-1 md:order-2 aspect-w-1 aspect-h-1">
               <div className="absolute inset-0">
                    {renderContent()}
                </div>
            </div>
        </div>
        <button onClick={handleModalClose} className="absolute top-4 end-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default TryOnModal;
