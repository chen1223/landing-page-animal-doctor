import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Hero images
  heroImgs: string[] = ['hero1.png', 'hero2.png', 'hero3.png', 'hero4.png'];

  // Gallery images
  lgGallery: string[] = ['gallery_lg.png'];
  mdGallery: string[] = ['gallery_md1.png', 'gallery_md1.png'];
  smGallery: string[] = ['gallery_sm1.png', 'gallery_sm2.png'];

  // Professional images
  profileImgs: string[] = ['profile1.jpg', 'profile2.jpg', 'profile3.jpg', 'profile4.jpg', 'profile5.jpg'];

  // Determine of current section scrolled into
  fragment: string = '';

  // Determine index of selected hero
  selectedHeroIndex: number = 0;
  // Current rotation angle in degree
  currDeg: number = 0;
  rotationUnit: number = 90;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      this.scrollToView(fragment);
    });
  }

  scrollToView(target): void {
    try {
      document.querySelector(`#${target}`).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    } catch (e) {
    }
  }

  // On next
  onNext(): void {
    this.currDeg -= this.rotationUnit;
    this.selectedHeroIndex += 1;
    this.selectedHeroIndex %= 4;
    this.rotateCarousel();
  }
  onPrev(): void {
    this.currDeg += this.rotationUnit;
    this.selectedHeroIndex -= 1;
    if (this.selectedHeroIndex < 0) {
      this.selectedHeroIndex += 4;
    }
    this.rotateCarousel();
  }
  rotateCarousel(): void {
    const carousel = <HTMLDivElement> document.querySelector('.carousel');
    const carouselImgs = document.querySelectorAll('.carousel__img');
    const heroText = document.querySelectorAll('.hero-text');
    carousel.style.transform = `rotateY(${this.currDeg}deg)`;
    const carouselArray = Array.from(carouselImgs);
    for(let i = 0; i < carouselArray.length; i++) {
      if (i === this.selectedHeroIndex) {
        (<HTMLDivElement> carouselArray[i]).style.transform = `rotateY(${this.currDeg * -1}deg) scale(.8)`;
      } else {
        (<HTMLDivElement> carouselArray[i]).style.transform = `rotateY(${this.currDeg * -1}deg) scale(.1)`;
      }
    }
    Array.from(heroText).forEach(el => {
      (<HTMLDivElement> el).style.transformOrigin = `0% 50%`;
      switch (this.selectedHeroIndex) {
        case 0:
          (<HTMLDivElement> el).style.transform = `rotateY(${this.currDeg * -1}deg) translateX(60px)`;
          break;
        case 1:
          (<HTMLDivElement> el).style.transform = `rotateY(${this.currDeg * -1}deg) translateX(80px)`;
          (<HTMLDivElement> el).style.right = '30%';
          break;
        case 2:
          (<HTMLDivElement> el).style.transform = `rotateY(${this.currDeg * -1}deg) translateX(100px)`;
          break;
        case 3:
          (<HTMLDivElement> el).style.transform = `rotateY(${this.currDeg * -1}deg) translateX(100px)`;
          break;
      }
    });
  }
}
