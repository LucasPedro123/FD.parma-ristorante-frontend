import './hero-slider.css';
import slider1 from "../../../assets/images/hero-slider-1.jpg";
import slider2 from "../../../assets/images/hero-slider-2.jpg";

import { useState, useEffect } from 'react';

export const HeroSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesData = [
        {
            image: slider1,
            title: "O Verdadeiro Sabor da Itália",
            subtitle: "Tradição & Autenticidade",
            description:
                "Sabores que atravessam gerações. Experimente pratos preparados com ingredientes frescos e o toque artesanal da culinária italiana.",
            buttonText: "Ver Nosso Cardápio",
        },
        {
            image: slider2,
            title: "Uma Experiência Gastronômica Única",
            subtitle: "Receitas Feitas com Paixão",
            description:
                "Sinta a harmonia entre aroma, textura e sabor. Venha viver momentos inesquecíveis ao redor da mesa com quem você ama.",
            buttonText: "Eu Quero!",
        },
    ];

    const totalSlides = slidesData.length;

    const slideInterval = 5000;

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
    };


    useEffect(() => {
        const interval = setInterval(nextSlide, slideInterval);

        return () => clearInterval(interval);
    }, [currentSlide]);


    return (
        <main>
            <article>
                <section className='hero text-center'>
                    <ul
                        className='hero-slider'
                    >
                        {
                            slidesData.map((slide, index) => (
                                <li
                                    id={`slide-${index}`}
                                    className={`slider-item ${currentSlide === index ? 'active' : ''}`}
                                    key={`slide-${currentSlide}-0`}
                                >
                                    <div className='slider-bg'>
                                        <img src={slide.image} alt="Slide 1" className='img-cover' />
                                    </div>
                                    <div className='wrapper-text'>
                                        <p className='label-2 section-subtitle slider-reveal'>{slide.subtitle}</p>
                                        <h1 className='display-1 hero-title slider-reveal'>{slide.title}</h1>
                                        <p className='hero-text slider-reveal'>{slide.description}</p>
                                        <a href="#" className='view-link btn-primary slider-reveal'>
                                            <span className='text text-1'>{slide.buttonText}</span>
                                            <span className='text text-2'>{slide.buttonText}</span>
                                        </a>
                                    </div>
                                </li>
                            ))
                        }

                    </ul>

                    <button
                        className='slider-btn prev'
                        onClick={prevSlide}
                    >
                        &lt;
                    </button>

                    <button
                        className='slider-btn next'
                        onClick={nextSlide}
                    >
                        &gt;
                    </button>
                </section>

                <a href="#" className='hero-btn has-before has-after'>
                    <span className='label-2 text-center'>Quero Reservar agora</span>
                </a>
            </article>
        </main>
    );
};
