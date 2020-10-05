import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const ShineRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];

export const MoistureRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const DefinitionRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const ShrinkageRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const HoldRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const FrizzRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];

@Injectable()
export class UtilProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UtilProvider Provider');
  }

}
