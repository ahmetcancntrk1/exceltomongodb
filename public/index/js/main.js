
(function ($) {
    "use strict";


    /*==================================================================
 [ Validate Unternehmen after type ]*/
    $('.validate-UnternehmenTruck .input100').each(function () {
        $(this).on('blur', function (input) {
            if (validateUnternehmenTruck(this) == false) {
                $(this).parent().addClass('true-validate')
            }
            else {
                showValidateUnternehmenTruck(this);

            }
        })
    })


    /*==================================================================
    [ Validate Unternehmen ]*/
    var input = $('.validate-UnternehmenTruck .input100');

    $('.validate-formTruck').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validateUnternehmenTruck(input[i]) == false) {
                showValidateTruck(input[i]);
                check = false;
            }
        }

        return check;
    });

        /*==================================================================
 [ Validate Unternehmen after type ]*/
 $('.validate-UnternehmenTrain .input100').each(function () {
    $(this).on('blur', function (input) {
        if (validateUnternehmenTrain(this) == false) {
            $(this).parent().addClass('true-validate')
        }
        else {
            showValidateUnternehmenTrain(this);

        }
    })
})


/*==================================================================
[ Validate Unternehmen ]*/
var input = $('.validate-UnternehmenTrain.input100');

$('.validate-formTrain').on('submit', function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
        if (validateUnternehmenTrain(input[i]) == false) {
            showValidateTrain(input[i]);
            check = false;
        }
    }

    return check;
});


    
    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });
   
    var Metrans = 'Metrans'
    var Kloiber = 'Kloiber'
    var Ahmet = 'ahmet'

    function validateUnternehmenTrain(input) {
        if ($(input).attr('type') == 'UnternehmenTrain' || $(input).attr('name') == 'UnternehmenTrain') {

            if ($(input).val().trim().match(Metrans) != null) {
                if ($(input).val() == Metrans) {
                    var metrans = '<br><input name="adresTrain" id="adresTrain" class="input100" type="text" value="Podleska 10400 Prag" readonly>'
                    $("#div-tstTrain").html(metrans);
                }
                return false;
            }
            if ($(input).val().trim().match(Kloiber) != null) {
                if ($(input).val() == Kloiber) {
                    var kloiber = '<br><input name="adresTrain" id="adresTrain" class="input100" type="text" value="Hofbräuallee 8 81829 München" readonly>'
                    $("#div-tstTrain").html(kloiber);
                }
                return false;
            }
            if ($(input).val().trim().match(Ahmet) != null) {
                if ($(input).val() == Ahmet) {
                    var ahmet = '<br><input name="adresTrain" id="adresTrain" class="input100" type="text" value="Ahmet 10400 Prag" readonly>'
                    $("#div-tstTrain").html(ahmet);
                }
                return false;
            }
        }
    }

    function showValidateUnternehmenTrain(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass(
        );
        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
    }

    function validateUnternehmenTruck(input) {
        if ($(input).attr('type') == 'UnternehmenTruck' || $(input).attr('name') == 'UnternehmenTruck') {

            if ($(input).val().trim().match(Metrans) != null) {
                if ($(input).val() == Metrans) {
                    var metrans = '<br><input name="adresTruck" id="adresTruck" class="input100" type="text" value="Podleska 10400 Prag" readonly>'
                    $("#div-tstTruck").html(metrans);
                }
                return false;
            }
            if ($(input).val().trim().match(Kloiber) != null) {
                if ($(input).val() == Kloiber) {
                    var kloiber = '<br><input name="adresTruck" id="adresTruck" class="input100" type="text" value="Hofbräuallee 8 81829 München" readonly>'
                    $("#div-tstTruck").html(kloiber);
                }
                return false;
            }
            if ($(input).val().trim().match(Ahmet) != null) {
                if ($(input).val() == Ahmet) {
                    var ahmet = '<br><input name="adresTruck" id="adresTruck" class="input100" type="text" value="Ahmet 10400 Prag" readonly>'
                    $("#div-tstTruck").html(ahmet);
                }
                return false;
            }
        }
    }

    function showValidateUnternehmenTruck(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass(
        );
        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
    }





    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }
    
    

})(jQuery);