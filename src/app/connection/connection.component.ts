import {
  Component,
  OnInit,
  ContentChild,
  ContentChildren,
  Attribute,
  OnDestroy,
  Input
} from '@angular/core';
import { FastDirective } from '../fast.directive';
import { SlowDirective } from '../slow.directive';
import { Observable, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Content } from '@angular/compiler/src/render3/r3_ast';

type Connection = {
  effectiveType: string
}

declare global {
  interface Navigator {
    connection: {
      effectiveType: string;
      addEventListener: Function;
      removeEventListener: Function;
    }
  }
}

const connection$ = new Observable(
  (observer) => {
    const { effectiveType } = navigator.connection;
    observer.next(effectiveType);

    const onConnectionChange = () => {
      const { effectiveType } = navigator.connection;
      observer.next(effectiveType);
    }

    navigator.connection.addEventListener('change', onConnectionChange);

    return () => {
      navigator.connection.removeEventListener('change', onConnectionChange);
      observer.complete();
    }
  }
)

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit, OnDestroy {
  isFast = true;
  @ContentChild(FastDirective) fast: FastDirective;
  @ContentChild(SlowDirective) slow: SlowDirective;

  private subscription: Subscription;


  constructor(
    @Attribute('listen') private withChanges: boolean
  ) { }

  ngOnInit(): void {
    const connection = navigator.connection;

    if (!connection || !connection.effectiveType) {
      // If the browser doesn't support it, we render the fast template
      return;
    }

    this.subscription = connection$
      .pipe(take(this.withChanges ? Number.POSITIVE_INFINITY : 1))
      .subscribe((effectiveType: string) => {
        if (/\slow-2g|2g|3g/.test(effectiveType)) {
          this.isFast = false;
        }
        else {
          this.isFast = true;
        }
      })

  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

}
