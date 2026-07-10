"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Animations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animates the chapters fading in and sliding up
    const chapters = gsap.utils.toArray('.mv-chapter, .mv-sumario, .mv-files');
    chapters.forEach((chap) => {
      gsap.fromTo(chap, 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chap,
            start: 'top 85%',
          }
        }
      );
    });

    // Parallax effect on the background blobs
    const blobs = gsap.utils.toArray('.blob-anim');
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        yPercent: i % 2 === 0 ? 30 : -30,
        xPercent: i % 3 === 0 ? 20 : -20,
        ease: 'none',
        scrollTrigger: {
          trigger: blob.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });

  }, []);
  
  return null;
}
