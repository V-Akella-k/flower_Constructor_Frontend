import { yellowFlower } from "@/shared/assets/videos"
import './hero.css';
import { useEffect, useRef } from "react";
import { CallToAction } from "@/features/buttons/CallToAction";

export const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    //Замедляем воспроизведение видео
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.playbackRate = 0.6;
        }
    }, []);

    return (
        <section className="hero" aria-label="Hero">
            <video
                className="hero__video"
                ref={videoRef}
                src={yellowFlower}

                playsInline={true}
                autoPlay={true}
                muted={true}
            // loop={true}
            />
            <div className="hero__overlay">
                <h1 className="hero__brand">PETALI ARTE EMOZIONI</h1>

                <h2 className="hero__title">Эмоции, рожденные из лепестков</h2>

                <p className="hero__subtitle">
                    Мы соединили искусство флористики и технологию, чтобы дать вашим клиентам возможность творить.
                    <br />
                    Pianta Infestante — первый интерактивный конструктор букетов, 
                    <br />
                    созданный со страстью к красоте.
                </p>
                <div className="hero__action-button">
                    <CallToAction />
                </div>
            </div>
        </section>
    )
}