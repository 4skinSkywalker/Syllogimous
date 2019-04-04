import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Syllogism } from './syllogism';
import { fromEvent } from 'rxjs';
import { mapTo, map, tap, scan } from 'rxjs/operators';
import { merge } from 'rxjs/index';

@Component({
  selector: 'app-syllogimous',
  templateUrl: './syllogimous.component.html',
  styleUrls: ['./syllogimous.component.scss']
})
export class SyllogimousComponent implements OnInit {
  @ViewChild('true')
  true: ElementRef;
  @ViewChild('false')
  false: ElementRef;
  syllogism = new Syllogism();
  value;
  text;
  score = +localStorage.getItem('score') || 0;
  goal = +localStorage.getItem('goal') || 10;

  constructor() { }

  ngOnInit() {
    this.newSyllogism();

    const true$ = fromEvent(this.true.nativeElement, 'click')
      .pipe(
        mapTo(true)
      );

    const false$ = fromEvent(this.false.nativeElement, 'click')
      .pipe(
        mapTo(false)
      );

    const answer$ = merge(true$, false$);

    answer$
      .pipe(
        map(answer => answer === this.value.isValid ? +1 : -1),
        tap(point => console.log(point === 1 ? 'Correct!' : 'Incorrect.')),
        scan((acc, point) => acc + point, this.score),
        tap(score => {
          if (score === this.goal) {
            this.goal *= 2;
            localStorage.setItem('goal', '' + this.goal);
          }
          localStorage.setItem('score', '' + score);
          this.newSyllogism();
        })
      )
      .subscribe(score => {
        this.score = score;
      });
  }

  newSyllogism() {
    this.value = this.syllogism.init();
    this.text = this.value.text;
    // console.log('New:', this.value);
  }

}
