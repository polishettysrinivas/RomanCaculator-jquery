$(document).ready(function () {
    let firstno = $('#numone'),
        secondno = $('#numtwo'),
        calcOperator = $('#operator').val(),
        numconverted, reminderInt, reminderRoman, answerInt, finalAnswer, showmessage,
        numArray = [],
        numArrayConvt = [],
        firnoValid = false, secnoValid = false;
    $("#operator").change(function () {
        calcOperator = $(this).children("option:selected").val();
    });
    $(firstno).keyup(function () {
        firnoValid = checkValue(firstno);
    });
    $(secondno).keyup(function () {
        secnoValid = checkValue(secondno);
    });
    $("#caculate").click(function () {
        numArray = [];
        numArrayConvt = [];
        if (firnoValid && secnoValid) {
            numArray.push(firstno.val(), secondno.val());
            console.log(numArray);
            for (let num of numArray) {
                numconverted = convertToInt(num)
                if (numconverted < 0) { return }
                numArrayConvt.push(numconverted);
            }
            console.log(numArrayConvt);
            if (calcOperator == '-' && numArrayConvt[0] < numArrayConvt[1]) {
                showAnswer('Cannoct subtract Higher number from a Lower Number', 'result error');
            }
            else if (calcOperator == '/' && numArrayConvt[0] < numArrayConvt[1]) {
                showAnswer('Cannoct divide Higher number into Lower Number', 'result error');
            }
            else {
                answerInt = eval([numArrayConvt[0], calcOperator, numArrayConvt[1]].join(""));
                reminderInt = (calcOperator == '/') ? numArrayConvt[0] % numArrayConvt[1] : 0;
                reminderRoman = convertToroman(reminderInt);
                finalAnswer = convertToroman(answerInt);
                showmessage = (reminderInt !== 0 && calcOperator == '/') ? 'The Answer is : ' + finalAnswer + '<br><i>The reminder is : </i>' + reminderRoman : 'The Answer is : ' + finalAnswer
                showAnswer(showmessage, 'result success');
            }
        }
    });
    function validRoman(romanNum) {
        let num = romanNum.toUpperCase();
        let validRomanNums = ["M", "D", "C", "L", "X", "V", "I", "(", ")"]
        for (let i = 0; i < num.length; i++) {
            isvalidRoman = validRomanNums.includes(num.charAt(i));
            if (!isvalidRoman) { return false }
        }
        return isvalidRoman;
    }
    function showValidation(ctrl, msg) {
        $(ctrl).parent('div').addClass('haserror');
        $(ctrl).siblings('span').text(msg);
    }
    function showAnswer(msg, cssclass) {
        $("#answerdiv").removeAttr('class');
        $("#answerdiv").addClass(cssclass);
        $('#answerdiv').html(msg);
    }
    function checkValue(ctrl) {
        if (ctrl.val() !== '') {
            inputnum = validRoman(ctrl.val());
            if (inputnum) {
                $(ctrl).parent('div').removeClass('haserror');
                $(ctrl).siblings('span').text('');
                return true;
            }
            else {
                showValidation(ctrl, 'Not a valid Roman Number');
                return false;
            }
        }
        else {
            showValidation(ctrl, 'Please enter a value');
            return false;
        }
    }
    function convertToInt(str1) {
        if (str1 !== null && validRoman(str1)) {
            let num = chartoint(str1.charAt(0));
            let pre, curr;
            for (let i = 1; i < str1.length; i++) {
                curr = chartoint(str1.charAt(i));
                pre = chartoint(str1.charAt(i - 1));
                if (curr <= pre) {
                    num += curr;
                } else {
                    num = num - pre * 2 + curr;
                }
            }
            return num;
        }
        else {
            alert('NOT a ROMAN');
            return -1;
        }
    }
    function chartoint(c) {
        switch (c) {
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
            default: return -1;
        }
    }
    function convertToroman(num) {
        const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
        let roman = '';
        for (let i in lookup) {
            while (num >= lookup[i]) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    }
});