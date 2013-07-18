//var reader = new FileReader();
//var contents;
//reader.onload = function(event) {
  //contents = event.target.result;
  //console.log(contents);
//};

//var lines = contents.split('\n');
var lex = {
	k: 0,	kh: 1, g: 2,	ng: 3,
	c: 4,	ch: 5, j: 6,	ny: 7,
	t: 8,	th: 9, d: 10,	n: 11,
	p: 12,	ph: 13, b: 14,	m: 15, ts: 16,	tsh: 17,
	dz: 18, w: 19,
	zh: 20,	z: 21, "\'": 22,y: 23,
	r: 24,	l: 25, sh: 26,	s: 27,
	h: 28,	a: 29, i: 30, u: 31, e: 32, o:33,
	check: function(a, b) {   // a first if return is negative
		return (lex[a] - lex[b]);
	},
  compare: function(s, t) {
    var x = s.split('');
    var y = t.split('');
    var i = 0;

    while(true) {

      if(i > s.length) {
        return t;
      }
      else if(i > t.length) {
        return s;
      }
      else if(lex.check(x[i], y[i]) === 0) {
        i++;
        continue;
      }
      else {
        var res = lex.check(x[i], y[i]);
        return res < 0 ? s : t;
      }
      i++;

    }

  }

};

var vowels = {
	a: 0, i: 1,
	u: 2, e: 3,
	o: 4
};

var syllable = {
  str: "",
	prefix: "",
	suprscrib: "",
	root: "",
	vowel: "",
	suffix: "",
	secsuff: ""
};

var result = lex.check("\'", "k");
console.log(result);
  var result = lex.check("\'", "k");
function translate(st, syl) {
  syl.str = st;
  var chars = '';
    syl.str = st;
	if(st.length == 1) {
		syl.root = st;
    if(st in vowels)
      syl.vowel = st;
	}
	else {
    chars = st.split('');
	}
      chars = st.split('');
  if(st.length == 2) {
    if(!(chars[0] in prefixes)) {
      
    }
  }
  var i = 0;
  for(var s in chars) {
    if(s in vowels){
      syl.vowel = s;
      syl.root = (i > 0) ? chars[i - 1] : chars[i];
    }
    i++;
  }
		
  return syl;
}
var a = "ka ba";
var b = "ra sha";
var res = lex.compare(a, b);
//var res = lex.compare("ka", "ra");
console.log(a + " and " + b + "?? \nWell, " + res + " is first.");
  //var res = lex.compare("ka", "ra");
  //console.log(res);
