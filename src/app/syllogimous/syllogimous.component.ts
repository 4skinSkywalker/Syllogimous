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
  syllogism = new Syllogism();
  value;
  text;
  score = +localStorage.getItem('score') || 0;
  goal = +localStorage.getItem('goal') || 10;

  constructor() { }

  ngOnInit() {
    this.newSyllogism(this.score);

    const btnTrue = this.btnTrue.nativeElement;
    const true$ = fromEvent(btnTrue, 'click')
      .pipe(
        tap(() => this.addClass(btnTrue, 'active', 400)),
        mapTo(true)
      );

    const btnFalse = this.btnFalse.nativeElement;
    const false$ = fromEvent(btnFalse, 'click')
      .pipe(
        tap(() => this.addClass(btnFalse, 'active', 400)),
        mapTo(false)
      );

    const answer$ = merge(true$, false$);

    answer$
      .pipe(
        map(answer => answer === this.value.isValid ? +1 : -1),
        tap(point => console.log(point === 1 ? 'Correct!' : 'Incorrect.')),
        scan((acc, point) => acc + point, this.score),
        tap(score => {
          if (score >= this.goal) {
            this.goal = Math.pow(10, Math.ceil(Math.log10(score + 1)));
            localStorage.setItem('goal', '' + this.goal);
          }
          localStorage.setItem('score', '' + score);
          this.newSyllogism(score);
        })
      )
      .subscribe(score => {
        this.score = score;
      });
  }

  private newSyllogism(score) {
    let namingFn = this.syllogism.useLetters;
    let doesTextChange = false;
    switch (true) {
      case score > 599:
        namingFn = this.syllogism.useSimilar;
        doesTextChange = true;
        break;
      case score > 499:
        namingFn = this.syllogism.useSimilar;
        break;
      case score > 349:
        namingFn = this.syllogism.useBraille;
        doesTextChange = true;
        break;
      case score > 249:
        namingFn = this.syllogism.useBraille;
        break;
      case score > 149:
        namingFn = this.syllogism.useLetters;
        doesTextChange = true;
        break;
      case score > 99:
        namingFn = this.syllogism.useWords;
        break;
    }
    this.value = this.syllogism.init(namingFn, doesTextChange);
    this.text = this.value.text;
    // console.log('New:', this.value);
  }

  private addClass(element, name, time) {
    element.classList.add(name);
    setTimeout(() => element.classList.remove(name), time);
  }
}