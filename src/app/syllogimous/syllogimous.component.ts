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
  btnTrue: ElementRef;
  @ViewChild('false')
  btnFalse: ElementRef;
  isSyllogismShown = true;
  syllogism = new Syllogism();
  value;
  argument;
  score = +localStorage.getItem('score') || 0;
  goal = +localStorage.getItem('goal') || 10;
  timers = [];

  constructor() { }

  ngOnInit() {
    this.newSyllogism(this.score);

    const btnTrue = this.btnTrue.nativeElement;
    const true$ = fromEvent(btnTrue, 'click')
      .pipe(
        tap(() => this.wowAnimation(btnTrue, 'active', 400)),
        mapTo(true)
      );

    const btnFalse = this.btnFalse.nativeElement;
    const false$ = fromEvent(btnFalse, 'click')
      .pipe(
        tap(() => this.wowAnimation(btnFalse, 'active', 400)),
        mapTo(false)
      );

    const answer$ = merge(true$, false$);

    answer$
      .pipe(
        map(answer => {
          if (answer === this.value.isValid) {
            return 1;
          }

          if (this.score > 999) {
            return -10;
          }

          return -1;
        }),
        scan((acc, point) => acc + point, this.score),
        tap(score => {
          if (score >= this.goal) {
            this.goal = Math.pow(10, Math.ceil(Math.log10(score + 1)));
            localStorage.setItem('goal', '' + this.goal);
          }
          localStorage.setItem('score', '' + score);

          this.timers.map(id => clearTimeout(id));
          this.newSyllogism(score);
          this.isSyllogismShown = true;
        })
      )
      .subscribe(score => {
        this.score = score;
      });
  }

  private newSyllogism(score) {
    let namingFn = this.syllogism.useLetters;
    if (score > 99 && Math.random() < this.mapToPercentage(score, 0, 1000)) {
      namingFn = this.syllogism.useSimilar;
    }

    this.value = this.syllogism.init(namingFn);
    const { minor, major, conclusion } = this.value;
    this.argument = { minor, major, conclusion };

    if (score > 999) {
      this.timers.push(
        setTimeout(() => {
            this.isSyllogismShown = false;
          }, 10000 - 6000 * this.mapToPercentage(score, 1000, 3000))
      );
    }
  }

  private mapToPercentage(value, start, end) {
    if (value < start) {
      return 0;
    } else if (value > end) {
      return 1;
    }
    return (value - start) / (end - start);
  }

  private wowAnimation(element, name, time) {
    element.classList.add(name);
    setTimeout(() => element.classList.remove(name), time);
  }
}
