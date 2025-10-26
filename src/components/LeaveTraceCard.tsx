import { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

export function LeaveTraceCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas background to white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#0a1628';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Touch event handlers for mobile
  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#0a1628';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const sendDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsSending(true);

    try {
      // Convert canvas to base64 data URL
      const dataUrl = canvas.toDataURL('image/png');
      
      // Send to Supabase
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8dae514e/traces`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: dataUrl,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('Your trace has been added ✨', {
          description: 'Thank you for leaving your mark!',
        });
        clearCanvas();
      } else {
        toast.error('Failed to save your trace', {
          description: 'Please try again.',
        });
      }
    } catch (error) {
      console.error('Error sending drawing:', error);
      toast.error('Failed to save your trace', {
        description: 'Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-xl" />
        <div className="relative bg-card/80 backdrop-blur-sm p-8 rounded-lg border border-border max-w-md w-full">
          <div className="mb-4">
            <h3 className="text-2xl mb-2 text-foreground">Leave a Trace</h3>
            <p className="font-mono text-sm text-muted-foreground">
              This site keeps a piece of everyone who visits. Draw something or leave your mark below.
            </p>
          </div>
          
          <div className="mb-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="w-full bg-white rounded-lg border border-gray-300 cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawingTouch}
              onTouchMove={drawTouch}
              onTouchEnd={stopDrawingTouch}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={clearCanvas}
              variant="outline" 
              className="font-mono border-primary/30 text-primary flex-1"
            >
              clear
            </Button>
            <Button 
              onClick={sendDrawing}
              disabled={isSending}
              className="bg-accent hover:bg-accent/80 text-accent-foreground font-mono flex-1"
            >
              {isSending ? 'sending...' : 'send'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
