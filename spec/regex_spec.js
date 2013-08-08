reg = require ("../wylie.js");

function forEach(array, check, exp, state) {
    for (var i = 0; i < array.length; i++) {
        if(state)
            check(array[i]).toMatch(exp);
        else
            check(array[i]).not.toMatch(exp);
    }
}

var vowels = ["i", "u", "e", "o"];

function addvow() {
    var result = [];
    for (var i = 0; i < reg.alph.length; i++) {
        for (var j = 0; j < vowels.length; j++)
            result.push(reg.alph[i] + vowels[j]);
    }
    return result;
}

var sin_sub = [ "bla", "bra", "bya", "bza", "cha", "dra", "dva", "dwa", "dza",
                "gla", "gra", "gva", "gwa", "gya", "gza", "hra", "hva", "hwa",
                "hya", "kha", "kla", "kra", "ksa", "kwa", "kya", "l'a", "lba",
                "lca", "lda", "lga", "lha", "lka", "lpa", "lta", "lva", "lwa",
                "mra", "mya", "nga", "nya", "pha", "pra", "pya", "r'a", "rba",
                "rda", "rga", "rja", "rka", "rla", "rma", "rna", "rta", "rva",
                "rwa", "rya", "sba", "sda", "sga", "sha", "ska", "sla", "sma",
                "sna", "spa", "sra", "sta", "sva", "swa", "sya", "tha", "tra",
                "tsa", "tva", "twa", "tya", "zha", "zla", "zwa"
            ];

var sin_pre = [
                "'ba", "'da", "'ja", "'ma", "'na", "bca", "bga", "bha", "bka",
                "bna", "dba", "dda", "dga", "dha", "dka", "dma", "dpa", "g'a",
                "gba", "gga", "gha", "gka", "gma", "gna", "gsa", "gta", "mba",
                "mda", "mga", "mna"
            ];

describe("Testing regex", function() {

    var r = reg.regex;
    var singlevow = [];

    beforeEach(function() {
        singlevow = addvow();
    });

    it("Checks single letter with no wovel", function() {

        var exp = r.one;

        forEach(reg.alpha, expect, exp, true);
        forEach(reg.alph, expect, exp, true);
        forEach(singlevow, expect, exp, false);
        forEach(["rag", "sar", "las"], expect, exp, false);
    });

    it("Checks single letter with common wovel", function() {

        var exp = r.two;

        forEach(singlevow, expect, exp, true);
        forEach(reg.alph, expect, exp, false);
        forEach(reg.alpha, expect, exp, false);
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

    it("Checks prefix with no vowel modifier", function() {
        var false_words = ["tram", "ram", "rma"];
        var exp = r.three_pre;

        forEach(sin_pre, expect, exp, true);
        forEach(false_words, expect, exp, false);
        forEach(reg.alpha, expect, exp, false);
        forEach(reg.alph, expect, exp, false);
        forEach(sin_sub, expect, exp, false);
    });

    xit("Checks single letter with no wovel", function() {
        var true_words = ["sha", "ra"];
        var false_words = ["she", "ri", "rad"];

        forEach(true_words, expect, r.one, true);
        forEach(false_words, expect, r.one, false);
    });

    xit("Checks single letter with no wovel", function() {
        var true_words = ["sha", "ra"];
        var false_words = ["she", "ri", "rad"];

        forEach(true_words, expect, r.one, true);
        forEach(false_words, expect, r.one, false);
    });

    xit("Checks single letter with no wovel", function() {
        var true_words = ["sha", "ra"];
        var false_words = ["she", "ri", "rad"];

        forEach(true_words, expect, r.one, true);
        forEach(false_words, expect, r.one, false);
    });

    xit("Checks single letter with no wovel", function() {
        var true_words = ["sha", "ra"];
        var false_words = ["she", "ri", "rad"];

        forEach(true_words, expect, r.one, true);
        forEach(false_words, expect, r.one, false);
    });

    xit("Checks single letter with no wovel", function() {
        var true_words = ["sha", "ra"];
        var false_words = ["she", "ri", "rad"];

        forEach(true_words, expect, r.one, true);
        forEach(false_words, expect, r.one, false);
    });
});
