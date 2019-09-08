import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, style, transition, state, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('profList', [
      state('enterRight', style({
        opacity: 1,
      })),
      state('enterLeft', style({
        opacity: 1,
      })),
      state('exitRight', style({
        opacity: 1,
        transform: 'translateX(480%)'
      })),
      state('exitLeft', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => enterRight', [
        style({
          opacity: 0,
          transform: 'translateX(600%)'
        }),
        animate('0.45s ease-out')
      ]),
      transition('void => enterLeft', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.45s ease-out')
      ]),
      transition('exitLeft => void', [
        animate('0.45s ease-in', style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }))
      ]),
      transition('exitRight => void', [
        animate('0.45s ease-in', style({
          opacity: 0,
          transform: 'translateX(-600%)'
        }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  // Hero images
  heroImgs: string[] = ['hero1.png', 'hero2.png', 'hero3.png', 'hero4.png'];

  // Gallery images
  lgGallery: string[] = ['gallery_lg.png'];
  mdGallery: string[] = ['gallery_md1.png', 'gallery_md1.png'];
  smGallery: string[] = ['gallery_sm1.png', 'gallery_sm2.png'];

  // Determine of current section scrolled into
  fragment: string = '';

  // Determine index of selected hero
  selectedHeroIndex: number = 0;
  // Current rotation angle in degree
  currDeg: number = 0;
  rotationUnit: number = 90;

  /**
   * Professionals related variables
   */
  profActiveIndex = 4;
  profPosition: number = -20;
  profileList: Object[] = [
    {
      img: 'profile1.jpg',
      name: 'Julia Johnson',
      title: 'surgeon',
      patients: 15,
      state: 'enterRight'
    },
    {
      img: 'profile2.jpg',
      name: 'Andrew Huang',
      title: 'dentist',
      patients: 25,
      state: 'enterRight'
    },
    {
      img: 'profile3.jpg',
      name: 'Ellen Bennett',
      title: 'therapist',
      patients: 22,
      state: 'enterRight'
    },
    {
      img: 'profile4.jpg',
      name: 'Cameron Brown',
      title: 'traumatologist',
      patients: 38,
      state: 'enterRight'
    },
    {
      img: 'profile5.jpg',
      name: 'Samantha Lamar',
      title: 'consultant',
      patients: 42,
      state: 'enterRight'
    }
  ];

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

  onResize(): void {
    this.renderAvatar();
  }

  /**
   * Hero Section related functions
   */

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
          (<HTMLDivElement> el).style.transform = `rotateY(${this.currDeg * -1}deg) translateX(60px)`;
          (<HTMLDivElement> el).style.right = '30%';
          break;
        case 2:
          (<HTMLDivElement> el).style.transform = `rotateY(${this.currDeg * -1}deg) translateX(60px)`;
          break;
        case 3:
          (<HTMLDivElement> el).style.transform = `rotateY(${this.currDeg * -1}deg) translateX(60px)`;
          break;
      }
    });
  }

  /**
   * Professionals related functions
   */
  // Set up professional list
  setUpProfList(): void {
    while (this.profileList.length <= 5) {
      this.profileList.push(...this.profileList);
    }
  }
  // Render W : H (1 : 1) based on current width
  renderAvatar(): void {
    const avatars = document.querySelectorAll('.avatar-wrapper');
    Array.from(avatars).forEach(avatar => {
      const width = (<HTMLDivElement> avatar).clientWidth;
      (<HTMLDivElement> avatar).style.height = `${width}px`;
      avatar.classList.add('shown');
    });
  }
  // On user click on next on professional slider
  onNextProf(): void {
    this.profileList[0]['state'] = 'exitLeft';
    let profile = this.profileList.shift();
    setTimeout(() => {
      profile['state'] = 'enterRight';
      this.profileList.push(profile);
    }, 150);
  }
  // On user click on previous on professional slider
  onPrevProf(): void {
    this.profileList[this.profileList.length - 1]['state'] = 'exitRight';
    let profile = this.profileList.pop();
    setTimeout(() => {
      profile['state'] = 'enterLeft';
      this.profileList.splice(0, 0, profile);
    }, 50);
  }
}
