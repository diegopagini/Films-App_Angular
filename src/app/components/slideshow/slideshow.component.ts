import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response-';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];

  constructor() {}

  ngAfterViewInit() {
    const mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
    });
  }

  ngOnInit(): void {
    console.log(this.movies);
  }
}
