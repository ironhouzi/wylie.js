reg = require ("../wylie.js");

function forEach(array, check, exp, state) {
    for(var i = 0; i < array.length; i++) {
        if(state)
            check(array[i]).toMatch(exp);
        else
            check(array[i]).not.toMatch(exp);
    }
}


describe("Testing regex", function() {

    regex = {};
    beforeEach(function() {
        var regex = Object.create(reg.regex);
    });

    it("Checks single letter with no wovel", function() {
        var true_words = ["sha", "ra"];
        var false_words = ["she", "ri", "rad"];

        forEach(true_words, expect, regex.one, true);
        forEach(false_words, expect, regex.one, false);
    });
});
