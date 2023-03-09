export type Tfach = {
	fid: number;
	name: string;
	kurz: string;
	ilias: string;
	dozent: string;
	gruppe: string;
  };

  export type TweekDay = "mo" | "di" | "mi" | "do" | "fr"
  
  export type Tgruppe = {
	stdid: number;
	kw: number;
	tag: TweekDay;
	stunde: number;
	fach: number;
	raum: string;
  };
  
  export type Tstunde = Tgruppe & Tfach;
  
  
  
  export type TgrStunde = {
	fach: string;
	kurz: string;
	dozent: string;
	ilias: string;
	raum: string;
  }
  
  export type TgrTag = {
	1?: TgrStunde;
	2?: TgrStunde;
	3?: TgrStunde;
	4?: TgrStunde;
	5?: TgrStunde;
	6?: TgrStunde;
	7?: TgrStunde;
	8?: TgrStunde;
	9?: TgrStunde;
  }
  
  export type TstdNrs = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  
  export type TgrWoche = {
	mo: TgrTag;
	di: TgrTag;
	mi: TgrTag;
	do: TgrTag;
	fr: TgrTag;
  }
  
  export type TgrRes = {
	result: 
	{
	  10?: TgrWoche;
	  11?: TgrWoche;
	  12?: TgrWoche;
	  13?: TgrWoche;
	  14?: TgrWoche;
	  15?: TgrWoche;
	  16?: TgrWoche;
	  17?: TgrWoche;
	  18?: TgrWoche;
	  19?: TgrWoche;
	  20?: TgrWoche;
	  21?: TgrWoche;
	  22?: TgrWoche;
	  23?: TgrWoche;
	  24?: TgrWoche;
	};
  }
  
  export type TkwNrs = 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
  