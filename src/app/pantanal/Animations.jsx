"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Animations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // IntersectionObserver para as seções (Fallback seguro e performático)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });

    const chapters = document.querySelectorAll('.mv-chapter, .mv-sumario, .mv-files');
    chapters.forEach((chap) => observer.observe(chap));

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
