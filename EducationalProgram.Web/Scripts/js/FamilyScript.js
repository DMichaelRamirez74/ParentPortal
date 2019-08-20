


var tempMakers = [];
var ConfimationDetail = "";
$(function () {
    var ChildTemplate = $('.child_info').html();

    $('.mCSB_container').find('div').eq(0).find('.remove-child').hide();

    var $dropdown1 = $("#ddlPrimaryCenter");

    var $dropdown2 = $("#ddlSecondaryCenter");

    $dropdown1.change(function () {
        $dropdown2.empty().append($dropdown1.find('option').clone());
        var selectedItem = $(this).val();
        if (selectedItem) {
            $dropdown2.find('option[value="' + selectedItem + '"]').remove();
        }
    });

    //Transport
    CheckTransportForAgency();

    //Location Status
    $('.chkLocationStatus').on('change', function () {
        $('.err-message-location').hide();
        if ($('#chkPartyDay').is(':checked') || $('#chkFullDay').is(':checked') || $('#chkSchoolDay').is(':checked'))
            $('.loct_form').show();
        else
            $('.loct_form').hide();
        $('#ddlPrimaryCenter').val("0");
        $('#ddlSecondaryCenter').val('0');
    });
    $('#ddlPrimaryCenter').change(function () {
        $('.err-message-primary').hide();
    });
    $('#ddlSecondaryCenter').change(function () {
        $('.err-message-secondary').hide();
    });
    //Disability Status
    $('body').on('change', 'input[name="Disability"]', function () {
        $('.err-message-disablity').hide();
    });

    //Gender Status
    $('body').on('change', 'input[name="Gender"]', function () {
        $('.err-message-gender').hide();
    });
    $('body').on('change', 'input[name="Transport"]', function () {
        $('.err-message-transport').hide();
    });
    //Append Child Dynamically

    //$('.child_info').on('click', '.add_child', function () {
    //    //$('.child_info').find('.mCSB_container').append(ChildTemplate);
    //    //$('.child_info').addClass('childcontainer');

    //});

    $('.number-only').on("keydown", function (e) {
        if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105) || e.which == 8 || e.which == 173 || e.which == 189 || e.which == 9 || e.which == 46 || e.which == 39 | e.which == 37 || (e.which == 16 && e.which == 9))
            return true;
        else
            return false;
    });

    //$('.phone-number').on("keydown", function (e) {
    //    if ((e.which >= 48 && e.which <= 57) || (e.shiftKey && e.which == 57) || (e.shiftKey && e.which == 48) || e.which == 189 || e.which == 8 || e.which == 9 || e.which == 46 || e.which == 39 | e.which == 37 || (e.which == 16 && e.which == 9))
    //        return true;
    //    else
    //        return false;
    //});

    $('body').on("keydown", ".alphabets-only", function (e) {
        if (e.which >= 65 && e.which <= 90 || e.which == 8 || e.which == 173 || e.which == 46 || e.which == 39 || e.which == 37 || e.which == 32 || e.which == 9 || e.which == 16 || e.which == 189)
            return true;
        else
            return false;
    });
    var flag = 0;
    $(".txtPhoneNumber").keydown(function (e) {
        flag++;
        if (flag > 1) {
            e.preventDefault();
        }
    });
    $(".txtPhoneNumber").keyup(function (e) {
        flag = 0;
        if (e.which != 8) {
            var val_old = $(this).val();
            var val = val_old.replace(/\D/g, '');
            var len = val.length;
            if (len >= 1)
                val = '(' + val.substring(0);
            if (len >= 3)
                val = val.substring(0, 4) + ') ' + val.substring(4);
            if (len >= 6)
                val = val.substring(0, 9) + '-' + val.substring(9);
            if (val != val_old)
                $(this).focus().val('').val(val);
        }
    });
    var flags = 0;
    $('body').on("keydown", ".txt-date", function (e) {

        flags++;
        if (flags > 1) {
            e.preventDefault();
        }

        var key = e.charCode || e.keyCode || 0;
        // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
        // home, end, period, and numpad decimal
        return (
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            key == 32 ||
            key == 37 ||
            key == 39 ||
            key == 35 ||
            key == 36 ||
            key == 110 ||
            key == 190 ||
            key == 191 ||
            (key >= 96 && key <= 111 || key >= 48 && key <= 57));
    });

    //Remove Child
    $(document).on('click', '.child_Info_container .remove-child', function () {

        if ($('.child_Info_container').length > 1) {
            $(this).closest('.child_Info_container').remove();

            if ($('.child_Info_container').length == 1)
                $('.child_Info_container').addClass('setmargin');
        }

        


        //if ($('.child_Info_container').length == 1)
        //    $('.child_info').removeClass('childcontainer');
    });



    $("body").on('keyup', '.txt-date', function (e) {
        flags = 0;
        if (e.keyCode != 193 && e.keyCode != 111) {
            if (e.keyCode != 8) {
                if ($(this).val().length == 2) {
                    $(this).val($(this).val() + "/");
                } else if ($(this).val().length == 5) {
                    $(this).val($(this).val() + "/");
                }
            } else {
                var temp = $(this).val();
                if ($(this).val().length == 5) {
                    $(this).val(temp.substring(0, 4));
                } else if ($(this).val().length == 2) {
                    $(this).val(temp.substring(0, 1));
                }
            }
        } else {
            var temp = $(this).val();
            var tam = $(this).val().length;
            $(this).val(temp.substring(0, tam - 1));
        }


    });

    $('.btnClear').click(function () {
        $('.FullName .err-message').add('.ChildFullName .err-message').text("First Name is required");
        $('.err-message').hide();
        $('.mandatory').val(''); $('.txtExtension').val('');
        $('.child_info').find('.mCSB_container').empty();
        $('.loct_form').hide();
        $('input[name="LocationStatus"]').prop('checked', false)
        $('.child_info').find('.mCSB_container').append(ChildTemplate);
        $('.child_info').find('div').eq(0).find('.remove-child').hide();
        grecaptcha.reset();
        if (markers[markers.length - 1].type == 'Parent')
            markers.pop();
        LoadMap();
    });
    $("body").on("keydown", ".txtChildFirstName,.txtChildLastName", function () {
        $(".ChildFullName").find(".err-message").hide();
    });
    $("body").on("focusout", ".txtChildFirstName,.txtChildLastName", function () {
        $(this).addClass('CheckChildExist');
        var Name = $(this).parent().parent().parent().find(".txtChildFirstName").val().trim() + $(this).parent().parent().parent().find(".txtChildLastName").val().trim();
        if (CheckChildNameExistOnFocusOut(Name)) {
            $(this).parent().parent().parent().find(".ChildFullName").find(".err-message").show();
            $(this).parent().parent().parent().find(".ChildFullName").find(".err-message").text("Name Already Exists!");
        }
        else {
            $(this).parent().parent().parent().find(".ChildFullName").find(".err-message").hide();
        }

    });
    $('.btnSave').click(function () {

        if (ValidateInput()) {
            if (!CheckChildNameExist()) {
                //Parent Info 
                $('#isBusy').show();
                var family = {};
                family.ParentId = 0;
                family.FirstName = $('.txtFirstName').val();
                family.LastName = $('.txtLastName').val();
                family.DOB = new Date($('.txtDOB').val());
                family.Address = $('.txtAddress').val();
                family.City = $('.txtCity').val();
                family.State = $('.txtState').val();
                family.ZipCode = $('.txtZipCode').val();
                family.PhoneNumber = $('.txtPhoneNumber').val(); family.Extension = $('.txtExtension').val();
                family.EmailAddress = $('.txtEmail').val();
                family.IsHomeBased = $('#chkHomeBased').is(':checked');
                family.IsPartyDay = $('#chkPartyDay').is(':checked');
                family.IsFullDay = $('#chkFullDay').is(':checked');
                family.IsSchoolDay = $('#chkSchoolDay').is(':checked');
                family.ChildTransport = $('input[name="Transport"]:checked').val() == undefined || $('input[name="Transport"]:checked').val() == "0" ? false : true;
                family.Base64ProfilePicture = $('.sub_parent_lst').find('.camera-container').is(':visible') && $('.sub_parent_lst').find('.camera-container').find('img#snap').is(':visible') ? getBase64Image($('.sub_parent_lst').find('.camera-container').find('img#snap')) : "";
                family.IncomeStatement = $('.sub_parent_lst').find('input:checkbox[name="IncomeStatement"]').is(':checked') ? $('.sub_parent_lst').find('input:checkbox[name="IncomeStatement"]:checked').val() : null;
                family.ReceivedChildSupport = $('.sub_parent_lst').find('input:checkbox[name="ReceivedChildSupport"]').is(':checked')?$('.sub_parent_lst').find('input:checkbox[name="ReceivedChildSupport"]:checked').val():null;
                family.PrimaryLanguageSpoken = $('.sub_parent_lst').find('select.ddlPrimaryLanguage').val();
                family.ProfilePicture = [];

                if ($('#ddlPrimaryCenter').val() != "0")
                    family.PrimaryCenterId = $('#ddlPrimaryCenter').val();
                if ($('#ddlSecondaryCenter').val() != "0")
                    family.SecondaryCenter = $('#ddlSecondaryCenter').val();

                //Child Info List
                var child = [];
                $('.child_Info_container').each(function () {
                    var Child = {};
                    Child.ChildId = 0; Child.FirstName = $(this).find('.txtChildFirstName').val(); Child.LastName = $(this).find('.txtChildLastName').val();
                    Child.DOB = new Date($(this).find('.txtChildDOB').val()); Child.Gender = $(this).find('input[name="Gender"]:checked').val();
                    Child.Disability = $(this).find('input[name="Disability"]:checked').val();
                    Child.ParentId = 0;
                    Child.Base64ProfilePicture = $(this).find('.camera-container').is(':visible') && $(this).find('.camera-container').find('img#snap').is(':visible') ? getBase64Image($(this).find('.camera-container').find('img#snap')) : "";;
                    Child.ShotRecordsAvailable = $(this).find('input[name="ShotRecords"]:checked').val();
                    Child.ProfilePicture = [];
                    child.push(Child);
                });

                //var FamilyDetails = { family: family, child: child };
               // FamilyDetails = JSON.stringify({ 'family': FamilyDetails });
               // var familyDetails = { familyViewModel: JSON.stringify(family), childViewModel: JSON.stringify(child) };
                $.ajax(
                    {
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        type: "POST",
                        asyn: false,
                        url: "/Family/SaveFamilyDetails",
                        data: JSON.stringify({ familyViewModel: family, childViewModel: child }),
                        success: function (data) {
                            if (data.Status) {
                                $('.msg-content').text('Family Details Saved');
                                $('.child_info').find('div').eq(0).find('.remove-child').hide();
                                family.State = $('.txtState').val();
                                FamilyDetails = { family: family, ParentId: data.parentId, child: child, CenterId: $('#ddlPrimaryCenter').val(), PrimaryCenter: $('#ddlPrimaryCenter option:selected').text(), SecondaryCenter: $('#ddlSecondaryCenter option:selected').text() };
                                FamilyDetails = JSON.stringify({ 'family': FamilyDetails });
                                SendMail(FamilyDetails);

                            }
                            else {
                                $('.msg-content').text('Unable to save family details!');
                                $('#myModal').modal('show');
                                return false;
                            }
                        },
                        error: function () {
                            $('.msg-content').text('Something went wrong!');
                            $('#myModal').modal('show');
                            return false;
                        }
                    });
            }
        }

    });
    $('.child_info').find('div').eq(0).find('.remove-child').hide();

    $('body').on("focusout", ".txtEmail", function () {
        console.log(validateEmail($(this).val()));
        if (!validateEmail($(this).val())) {
            $('.err-message-email').show();
        }
    });

    $('body').on("change keyup", ".mandatory", function () {
        if ($(this).attr("for") == "date" && $(this).parent().parent().find('.err-message').is(':visible'))
            $(this).parent().parent().find('.err-message').hide();
        else if ($(this).closest('div').find('.err-message').is(':visible'))
            $(this).closest('div').find('.err-message').hide();
        if ($(this).attr('placeholder') == "Last Name") {

            if ($(this).parent().parent().parent().find(".ChildFullName").find(".err-message").text() == "Name Already Exists!") {
                $(this).parent().parent().parent().find(".ChildFullName").find(".err-message").hide();
            }
        }
    });


    $("body").on("focusout", ".txtPhoneNumber", function (e) {
        if (!validatePhone($(this).val()))
            $(this).closest('div').find('.err-message').show();

    });

    $("body").on("focusout", ".txt-date", function (e) {
        var datecheck = $(this).val();
        if (datecheck != "undefined") {
            if (!validDate(datecheck)) {
                $(this).parent().parent().find('.err-message').show();
                $(this).parent().parent().find('.err-message').text("Enter Valid Date");
            }
        }
    });

    $("body").on("focusout", ".txtChildDOB", function () {
        VerifyChildAge();
    });
    $("body").on("focusout", ".txtDOB", function () {
        VerifyParentAge();
    });

    $("body").on("focusout", ".txtAddress ", function () {

        if ($(this).val() != null && $(this).val().trim() != "")
            checkAddress();

    });

    $("body").on("focusout", ".txtAppartmentNo ", function () {

        if ($(this).val() != null && $(this).val().trim() != "")
            checkAddress();

    });




    $(".txtZipCode").on("focusout", function () {


        if ($(this).val() != null && $(this).val().trim() != "") {
            var isValidZipCode = checkZipCode(this);


            if (isValidZipCode) {

                //if (checkAddress()) {
                //    debugger;
                //    getCityStateByZipCode(this);
                //}

                checkAddress();

            }


            LoadMapWithParentAddress();
        }

    });





    $('.upload-img-blk_cont').on('click', function () {

        var $this = this;
        fileTargetObj = this;
        navigator.mediaDevices.enumerateDevices().then(function (devices) {

            console.log(devices);
            var videoInputAvailable = false;
            devices.forEach(function (device) {
                //  debugger;

                if (device.kind == 'videoinput') {
                    videoInputAvailable = true;

                }
            });

            if (videoInputAvailable) {

                $('#modalfileUpload').find('#uploadFromDevice').off('click').on('click', function () {
                    //$('#modalfileUpload').modal('hide');
                    openFileUpload($this);

                });

                $('#modalfileUpload').find('button#SaveNoteSubmit').attr('onclick', 'saveDocumentCamera(this)');


                $('#modalfileUpload').modal('show');




            }
            else {
                openFileUpload(this);
            }

        });

    });

    $('input:file.file-upload').on('change', function (evt) {


        encodeImagetoBase64(evt);
    });



    //Camera JS


    $(document).on('click', '.start-camera', function (e) {

        debugger;

        e.preventDefault();

        $(e.target).next('.camera-stream').get(0).play();

        showVideo($(e.target).closest('.camera-container'));


        //    const leftVideo = document.getElementById('leftVideo');
        //    const rightVideo = document.getElementById('rightVideo');


        //let stream;
        //const fps = 0;
        //if ($(e.target).closest('.camera-container').find('.camera-stream')[0].captureStream) {
        //    stream = $(e.target).closest('.camera-container').find('.camera-stream')[0].captureStream(fps);
        //} else if ($(e.target).closest('.camera-container').find('.camera-stream')[0].mozCaptureStream) {
        //    stream = $(e.target).closest('.camera-container').find('.camera-stream')[0].mozCaptureStream(fps);
        //} else {
        //    console.error('Stream capture is not supported');
        //    stream = null;
        //}

        //$('.camera-container').each(function () {

        //    if ($(this).find('.camera-stream') != $(e.target).closest('.camera-container').find('.camera-stream'))

        //        $(this).find('.camera-stream')[0].srcObject = stream;
        //});

        //rightVideo.srcObject = stream;







    });


    $(document).on('click', '.take-photo', function (e) {

        e.preventDefault();

        debugger;
        var snap = takeSnapshot($(e.target).closest('.camera-container'));

        $(e.target).closest('.camera-container').find('#snap').removeAttr('src');
        $(e.target).closest('.camera-container').find('#snap').attr('src', snap);

        $(e.target).closest('.camera-container').find('video').removeClass('visible');
        $(e.target).closest('.camera-container').find('#snap').addClass('visible');

        $(e.target).closest('.camera-container').find('.delete-photo').removeClass('disabled');

        $(e.target).closest('.camera-container').find('.camera-stream').get(0).pause();
        $(e.target).closest('.camera-container').find('.take-photo').addClass('disabled');

    });



    $(document).on('click', '.delete-photo', function (e) {

        e.preventDefault();

        $(e.target).closest('.camera-container').find('#snap').removeAttr('src').removeClass('visible');
        $(e.target).closest('.camera-container').find('.delete-photo').addClass('disabled');
        $(e.target).closest('.camera-container').find('.camera-stream').get(0).play();
        $(e.target).closest('.camera-container').find('.camera-stream').addClass('visible');
        $(e.target).closest('.camera-container').find('.take-photo').removeClass('disabled');
    });


    $(document).on('click', '.switch-camera', function (event) {
        debugger;

        var $closestDiv = $(event.target).closest('.camera-container');

        if (typeof currentStream !== 'undefined') {
            stopMediaTracks(currentStream);
        }
        if ($(event.target).attr('active-camera') == null || $(event.target).attr('active-camera') == '') {
            stopMediaTracks(currentStream);
        }

        const videoConstraints = {};
        if ($(event.target).attr('active-camera') === null || $(event.target).attr('active-camera') == '') {
            videoConstraints.facingMode = 'environment';
        } else {
            videoConstraints.deviceId = { exact: event.target.getAttribute(event.target.getAttribute('active-camera')) };
        }
        const constraints = {
            video: videoConstraints,
            audio: false
        };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(stream => {
              currentStream = stream;
              $closestDiv.find('.camera-stream')[0].srcObject = stream;

              return navigator.mediaDevices.enumerateDevices();
          })
          .then(function (value) { gotDevices(value, $closestDiv); })
          .catch(error => {
              console.error(error);
          });

    });


    $(document).on('click', '.add_link', function () {


        $('.child_sub_parent_list').first().removeClass('setmargin');


        $(".child_sub_parent_list").first().parent('div').parent('div').scrollLeft('last');


        var addChild = '<div class="sub_parent_lst child_sub_parent_list child_Info_container">\
  <div style="width:80px;float:right;margin:0 10px 0 0;">\
                        <a class="close_icon"><img class="remove-child" src="/Content/images/remove_icon.png" /></a>\
                    </div>\
                    <form role="form" class="col-xs-12">\
                        <h2>\
                            <img src="/Content/images/arw_icon.png" class="mCS_img_loaded">Child Information\
                        </h2>\
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">\
                            <div class="left-inner-addon ChildFullName">\
                                <i class="fa fa-user" aria-hidden="true"></i>\
                                <input type="text" class="form-control txtChildFirstName mandatory alphabets-only" placeholder="First Name">\
                                <div class="err-container">\
                                    <span class="err-message" style="display: none;">First Name is required</span>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">\
                            <div class="left-inner-addon">\
                                <i class="fa fa-user" aria-hidden="true"></i>\
                                <input type="text" class="form-control txtChildLastName mandatory alphabets-only" placeholder="Last Name">\
                                <div class="err-container">\
                                    <span class="err-message">Last Name is required</span>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">\
                            <div class="left-inner-addon">\
                                <i class="fa fa-birthday-cake" aria-hidden="true"></i>\
                                <input type="text" class="txtChildDOB mandatory txt-date form-control" maxlength="10" placeholder="Date Of Birth" id="dpChildDate">\
                                <div class="err-container">\
                                    <span class="err-message err-message-childdob">Enter Valid Date</span>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">\
                            <div class="left-inner-addon rd_lst" style="margin-bottom: 2px;">\
                                <i class="fa fa-venus-mars" aria-hidden="true"></i>\
                                <div class="rd_lst_sub">\
                                    <div class="radio radio-info">\
                                        <input type="radio" name="Gender" id="rbMale" value="Male">\
                                        <label>Male</label>\
                                    </div>\
                                    <div class="radio radio-info">\
                                        <input type="radio" name="Gender" id="rbFeMale" value="Female">\
                                        <label>Female</label>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="err-container col-xs-12" style="padding:0;">\
                                <span class="err-message err-message-gender">Gender is required</span>\
                            </div>\
                        </div>\
                        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">\
                            <div class="left-inner-addon rd_lst1" style="margin-bottom: 2px;">\
                                <i class="fa fa-wheelchair" aria-hidden="true"></i>\
                                <div class="rd_lst_sub1">\
                                    <div class="radio radio-info">\
                                        <input type="radio" name="Disability" id="rbSuspected" value="Suspected">\
                                        <label>Suspected</label>\
                                    </div>\
                                    <div class="radio radio-info">\
                                        <input type="radio" name="Disability" id="rbNone" value="None">\
                                        <label>No</label>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="err-container col-xs-12" style="padding:0;">\
                                <span class="err-message err-message-disablity" style="display: none;">Disability is required</span>\
                            </div>\
                        </div>\
                        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 shotRecordsContainer">\
                            <label style="color: #ffffff;font-weight: 500 !important;">Have shot records available for this child?</label>\
                            <div class="left-inner-addon rd_lst" style="margin-bottom: 2px;">\
                                <i class="fa fa-money" aria-hidden="true"></i>\
                                <div class="rd_lst_sub">\
                                    <div class="radio radio-info">\
                                        <input type="radio" name="ShotRecords" id="rbshotRecordsYes" value="1">\
                                        <label>Yes</label>\
                                    </div>\
                                    <div class="radio radio-info">\
                                        <input type="radio" name="ShotRecords" id="rbshotRecordsNo" value="0">\
                                        <label>No</label>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="err-container col-xs-12" style="padding:0;">\
                                <span class="err-message err-message-shotRecords">Shot records available is required</span>\
                            </div>\
                        </div>\
                        <div class="col-xs-12">\
                            <div class="camera-container col-xs-12" style="text-align: center;display:none;">\
                                <div class="app col-xs-12">\
                                    <a href="javascript:void(0);" class="start-camera visible">Take a snap to upload profile picture</a>\
                                    <video class="camera-stream"></video>\
                                    <img id="snap" class="mCS_img_loaded">\
                                    <p id="error-message"></p>\
                                    <div class="controls">\
                                        <a href="javascript:void(0);" class="delete-photo disabled" title="Delete Photo"><i class="material-icons">delete</i></a>\
                                        <a href="javascript:void(0);" class="take-photo" title="Take Photo"><i class="material-icons">camera_alt</i></a>\
                                        <a href="javascript:void(0);" class="switch-camera" title="Switch Camera"><i class="material-icons">switch_camera</i></a>\
                                    </div>\
                                    <!-- Hidden canvas element. Used for taking snapshot of video. -->\
                                    <canvas></canvas>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">\
                            <a class="add_link" href="javascript:void(0);">\
                                <i class="fa fa-plus" aria-hidden="true"></i>add another child to be considered for enrollment\
                            </a>\
                        </div>\
                    </form>\
                </div>';


        $('.child_sub_parent_list').parent('div').prepend(addChild);
     

        //checkUserMedia();
    });

    window.setInterval(function () {
        checkUserMedia();
    }, 1000);

    //Camera JS


});


var fileTargetObj = null;


function LoadMapWithParentAddress() {
    var con = $('.txtAddress').val() + "," + $('.txtCity ').val() + "," + $('.txtState').val() + "," + $('.txtZipCode').val();
    con = con.replace(",,", "").replace(",,,", "").trim();
    if (con.charAt(0) == ",")
        con = con.substring(1);
    if (con.slice(-1) == ",")
        con = con.slice(0, -1);
    if (con != "") {
        if (markers[markers.length - 1].type == 'Parent')
            markers.pop();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': con }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var x = results[0].geometry.location.lat();
                var y = results[0].geometry.location.lng();
                object = {
                    "title": con,
                    "lat": x,
                    "lng": y,
                    "description": 'Parent',
                    "type": 'Parent'
                };
                markers.push(object);
            } else {
            }
        });
    }
    LoadMap();
}


function validDate(text) {
    var isValid = true;
    var comp = text.split('/');
    if (comp.length !== 3)
        return false;
    if (comp[2].length != 4)
        return false;
    if (comp[2] <= 1901)
        return false;
    if (new Date(text).toString() == "Invalid Date")
        return false;
    if (!isvalid_mdy(text))
        return false;
    var TodayDate = new Date();
    var endDate = new Date(text);

    if (TodayDate < endDate) {
        return false;
    }
    return isValid;
}

function validatePhone(phoneNumber) {
    var phoneNumberPattern = /^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
    return phoneNumberPattern.test(phoneNumber);
}

function saveDocumentCamera(ele) {
    debugger;
    //  var docImage = $('#modalScreenDoc').find('#capt-img');
    var docImage = $(ele).closest('.modal').find('#capt-img');

    if (docImage[0].src.replace('data:,', '') == '') {
        customAlert('Please capture image using camera');
        return false;
    }
    else {

        var base64Image = getBase64Image(docImage);

        $(fileTargetObj).find('#convertedImage').val(base64Image);


        showImage($(fileTargetObj).find('input:file.file-upload'));


        $(ele).closest('.modal').modal('hide');


    }

}



function getBase64Image(img) {
    //debugger;
    //var canvas = document.createElement("canvas");
    //canvas.width = img.width;
    //canvas.height = img.height;
    //var ctx = canvas.getContext("2d");
    //ctx.drawImage(img, 0, 0);
    //var dataURL = ctx.toDataURL("image/png");
    //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    return $(img)[0].src.replace(/^data:image\/(png|jpg);base64,/, "");
}




function encodeImagetoBase64(evt) {
    var f = evt.target.files[0]; // FileList object
    //var f = file.files[0];
    // var f = file;
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            var binaryData = e.target.result;
            //Converting Binary Data to base 64
            var base64String = window.btoa(binaryData);
            //showing file converted to base64
            $(evt.target).next('#convertedImage').val(base64String);

            showImage(evt.target);
            //alert('File converted to base64 successfuly!\nCheck in Textarea');
        };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);
}

function showImage(ele) {
    debugger;
    // $(ele).closest('.upload-img-blk_cont').hide();

    var $convImg = 'data:image/png;base64,' + $(ele).next('#convertedImage').val();

    $(ele).closest('.upload-img-blk_cont').next('.uploaded-img-blk').find('img').attr('src', $convImg);
    $(ele).closest('.upload-img-blk_cont').next('.uploaded-img-blk').show();
}
function openFileUpload(ele) {




    $(ele).find('.file-upload').trigger('click');

    window.setTimeout(function () {
        $('#modalfileUpload').modal('hide');

    }, 100)
}


function CheckTransportForAgency() {
    $.ajax(
          {
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              type: "POST",
              url: "/Family/GetAgencyDetail",
              success: function (data) {
                  console.log(data);
                  if (data.ChildTransport)
                      $('.TransportContainer').show();
                  else
                      $('.TransportContainer').hide();
                  var path = "/Content/images/" + data.AgencyName + ".png";
                  console.log(path);
                  $(".imgLogo").attr("src", path);
                  var arr = data.AgencyName.split(' ');
                  if (arr.length == 2) {
                      $('.edu').text(arr[0]);
                      $('.cent').text(arr[1]);
                  }
                  else {
                      $('.edu').text(data.AgencyName);
                  }

              },
              error: function (data) {
                  console.log('SendMail Error');
              }
          });
}

function isvalid_mdy(s) {

    var day, A = s.match(/[1-9][\d]*/g);
    try {
        A[0] -= 1;
        day = new Date(+A[2], A[0], +A[1]);

        if (day.getMonth() == A[0] && day.getDate() == A[1]) return day;
    }
    catch (er) {
        return er.message;
    }

}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function ValidateInput() {
    debugger;
    $('.FullName .err-message').add('.ChildFullName .err-message').text("First Name is required");
    $('.err-message-parentdob').add('.err-message-childdob').text("Enter Valid Date");
    $('.err-message').hide();
    var isValid = true;
    $('.mandatory').each(function () {
        if ($(this).val() == "") {
            if ($(this).attr("for") == "date")
                $(this).parent().parent().find('.err-message').show();
            else
                $(this).closest('div').find('.err-message').show();
            if (isValid)
                isValid = false;
        }
        else if ($(this).attr("for") == "date" && !validDate($(this).val()))
            $(this).parent().parent().find('.err-message').show();
        else if ($(this).hasClass('txtState') && $(this).val() == "")
            $(this).closest('div').find('.err-message').show();
    });
    if (!VerifyParentAge()) {
        if (isValid)
            isValid = false;
    }
    if (!VerifyChildAge()) {
        if (isValid)
            isValid = false;
    }
    if (!validateEmail($('.txtEmail').val())) {
        if (isValid)
            isValid = false;
        $('.err-message-email').show();
    }
    if (!validatePhone($(".txtPhoneNumber").val())) {
        if (isValid)
            isValid = false;
        $('.PhonenoContainer').find('.err-message').show();
    }
    //if ($('.TransportContainer').is(':visible')) {
    //    if ($('input[name="Transport"]:checked').length == 0) {
    //        $('.err-message-transport').show();
    //        if (isValid)
    //            isValid = false;
    //    }
    //}
    $('.child_Info_container').each(function () {
        if ($(this).find('input[name="Gender"]:checked').length == 0) {
            $(this).find('.err-message-gender').show();
            if (isValid)
                isValid = false;
        }
        if ($(this).find('input[name="Disability"]:checked').length == 0) {
            $(this).find('.err-message-disablity').show();
            if (isValid)
                isValid = false;
        }

        if ($(this).find('input[name="ShotRecords"]:checked').length == 0) {
            $(this).find('.err-message-shotRecords').show();
            if (isValid)
                isValid = false;
        }


    });
    if ($('input[name="LocationStatus"]:checked').length == 0) {
        $('.err-message-location').show();
        if (isValid)
            isValid = false;
    }
    else {
        if ($('#chkPartyDay').is(':checked') || $('#chkFullDay').is(':checked')) {
            if ($('#ddlPrimaryCenter').val() == "0") {
                $('.err-message-primary').show();
                if (isValid)
                    isValid = false;
            }
            //if ($('#ddlSecondaryCenter').val() == "0") {
            //    $('.err-message-secondary').show();
            //    if (isValid)
            //        isValid = false;
            //}
        }
    }
    if (!IROBOT()) {
        if (isValid)
            isValid = false;
    }

    return isValid;

}

function CheckChildNameExistOnFocusOut(Name) {
    var IsExist = false;
    $('.child_Info_container').each(function () {
        if (!$(this).find('.txtChildFirstName').hasClass('CheckChildExist') && !$(this).find('.txtChildLastName').hasClass('CheckChildExist')) {
            var FirstName = $(this).find('.txtChildFirstName').val().trim(); var LastName = $(this).find('.txtChildLastName').val().trim();
            var FullName = FirstName + LastName;
            if (Name.toLowerCase() == FullName.toLowerCase())
                IsExist = true;
        }
    });
    $('.txtChildFirstName,.txtChildLastName').removeClass("CheckChildExist");
    return IsExist;
}

function CheckChildNameExist() {
    var ChildNames = [];
    var IsExist = false;
    $('.child_Info_container').each(function () {
        var FirstName = $(this).find('.txtChildFirstName').val().trim(); var LastName = $(this).find('.txtChildLastName').val().trim();
        var FullName = FirstName + LastName;
        if ($.inArray(FullName.toLowerCase(), ChildNames) > -1 && ChildNames.length != 0) {
            IsExist = true;
            $(this).find('.ChildFullName .err-message').show();
            $(this).find('.ChildFullName .err-message').text("Name Already Exists!");

        }
        else
            ChildNames.push(FirstName + LastName);
    });
    return IsExist;
}

function CheckParentNameExists(Firstname, Lastname) {
    var isExist = false;
    $.ajax(
           {
               contentType: 'application/json; charset=utf-8',
               dataType: 'json',
               type: "POST",
               url: "/Family/CheckParentNameExist",
               async: false,
               data: JSON.stringify({ 'FirstName': Firstname, 'LastName': Lastname }),
               success: function (data) {
                   isExist = data;
                   if (isExist) {
                       $('.FullName .err-message').show();
                       $('.FullName .err-message').text("Name Already Exists!");
                   }
               },
               error: function (data) {
                   console.log('CheckParentNameExists Error');
               }
           });
    return isExist;
}

function SendMail(FamilyDetails) {
    $.ajax(
           {
               contentType: 'application/json; charset=utf-8',
               dataType: 'json',
               type: "POST",
               url: "/Family/SendEmailForFSW",
               async: false,
               data: FamilyDetails,
               success: function (data) {
                   window.location.href = "/Family/Confirmation/" + data + "";
               },
               error: function (data) {
                   console.log('SendMail Error');
               }
           });
}

function VerifyParentAge() {
    var valid = false;
    var validParentDate = new Date();
    validParentDate.setFullYear(validParentDate.getFullYear() - 15);
    var ParentDOB = new Date($('.txtDOB').val());
    if (validParentDate < ParentDOB) {
        $('.err-message-parentdob').text("Age should be above 15");
        $('.err-message-parentdob').show();
    }
    else
        valid = true;
    return valid;
}

function VerifyChildAge() {
    var valid = true;
    var validChildDate = new Date();
    validChildDate.setFullYear(validChildDate.getFullYear() - 5);
    $('.child_Info_container').each(function () {
        var childDate = new Date($(this).find('.txtChildDOB').val());
        if (childDate > new Date() || validChildDate >= childDate) {
            $(this).find('.err-message-childdob').show();
            $(this).find('.err-message-childdob').text("Age should be below 5");
            valid = false;
        }
    });
    return valid;
}

function IROBOT() {
    var allow = false;
    var captcharesponse = grecaptcha.getResponse();
    if (captcharesponse != "" && captcharesponse != undefined) {
        $.ajax(
                      {
                          contentType: "application/json; charset=utf-8",
                          type: "POST",
                          url: "/Family/ValidateCaptcha",
                          async: false,
                          data: "{response:" + JSON.stringify(captcharesponse) + "}",
                          success: function (data) {
                              var obj = jQuery.parseJSON(data); 
                              //console.log(obj);
                              allow = obj.success

                              if (!allow) {
                                  $('.err-message-robo').show();
                                  grecaptcha.reset();
                              }
                          },
                          error: function (data) {
                              console.log('SendMail Error');
                          }
                      });
    }
    else {
        grecaptcha.reset();
        $('.err-message-robo').show();
    }
    return allow;
}


function checkZipCode(inputTextObject) {

    if ($(inputTextObject).val() != "") {
        var ret = true;
        var Zipcode = $(inputTextObject).val();
        var len = Zipcode.length;
        if ((isNaN(inputTextObject.value)) && (len < 2)) {
            $(inputTextObject).val('');
            customAlert("Zip code must be numeric. ");
            var ret = false;
        }
        else if (len < 2) {
            $(inputTextObject).val('');
            customAlert("Zip code length must be 2 digit. ");
            var ret = false;
        }
        else if (isNaN(inputTextObject.value)) {
            $(inputTextObject).val('');
            customAlert("Zip code must be numeric. ");
            var ret = false;
        }

        return ret;
    }
    else {

        $('#ddlCity').find('option').remove();
        $('.txtState').val('');
        $('#ddlCounty').val('');
    }
}


function checkAddress() {


    $.ajax({
        url: "/Family/CheckAddress",
        type: "POST",
        data: {
            Address: $('.txtAddress').val(),
            apartmentNumber: $('.txtAppartmentNo').val(),
            zipCode: $('.txtZipCode ').val()
        },
        dataType: "json",
        secureuri: false,
        async: false,
        success: function (response) {
            if (response == 1) {
                showExistsPoup();
            }
            else {

                if ($('.txtZipCode').val() != null && $('.txtZipCode').val() != "") {
                    getCityStateByZipCode($('.txtZipCode'));
                }
            }
        }
            , error: function (response) {
                customAlert("Session Ended Log Onto The System Again."); setTimeout(function () { window.location.href = HostedDir + '/login/Loginagency'; }, 2000);
            }
    });




}



function getCityStateByZipCode(ele) {
    debugger;
    $.ajax({
        url: '/Family/GetLocationInformationByZipCode',
        type: 'POST',
        datatype: 'JSON',
        data: { zipCode: $(ele).val() },
        success: function (data) {
            if (data != null && data.length > 0) {
                var state = null;
                var cities = [];
                var counties = [];

                $.each(data, function (i, zipDatas) {

                    state = zipDatas.State;

                    if (cities.indexOf(zipDatas.City) == -1)
                        cities.push(zipDatas.City);
                    if (counties.indexOf(zipDatas.County) == -1)
                        counties.push(zipDatas.County)
                });



                $('.txtState').val(state).prop('disabled', true);

                $('#ddlCity').find('option').remove().end();

                $('#ddlCity').append('<option value="0">Select City</option>');
                $.each(cities, function (j, city) {

                    $('#ddlCity').append('<option value=' + city + '>' + city + '</option>');
                });

                $.each(counties, function (k, county) {
                    $('.txtCounty').val(county);

                });



            }
        },
        error: function (data) {

        },
        complete: function (data) {

        }



    });
}



function showExistsPoup() {
    var result = false;
    BootstrapDialog.confirm('Address already exists. Do you want to continue?', function (result) {
        if (!result) {
            debugger;
            $('.txtAddress ').val("");
            $('.txtAppartmentNo ').val("");
            $('.txtZipCode ').val("");
            $('#ddlCity').find('option').remove().end();
            $('#City').val('');
            $('.txtState').val('').prop('disabled', true);
            $('.txtCounty ').val('');
            result = false;
        }
        else {
            var zipCode = $('.txtZipCode ').val();


            if (zipCode != null && zipCode != "") {
                getCityStateByZipCode($('.txtZipCode'));
            }
        }
    });

}


function showVideo(ele) {
    // Display the video stream and the controls.
    navigator.mediaDevices.enumerateDevices().then(function (value) {
        gotDevices(value, ele);

        window.setTimeout(function () {

            $(ele).find('.camera-stream').addClass('visible');
            $(ele).find('.start-camera').removeClass('visible').hide();
            $(ele).find('.controls').addClass('visible');

        }, 500);


    });

}





function takeSnapshot(ele) {
    // Here we're using a trick that involves a hidden canvas element.  

    var hidden_canvas = $(ele).find('canvas'),
        context = hidden_canvas[0].getContext('2d');

    var width = $(ele).find('.camera-stream')[0].videoWidth,
        height = $(ele).find('.camera-stream')[0].videoHeight

    if (width && height) {

        // Setup a canvas with the same dimensions as the video.
        hidden_canvas[0].width = width;
        hidden_canvas[0].height = height;

        // Make a copy of the current frame in the video on the canvas.
        context.drawImage($(ele).find('.camera-stream')[0], 0, 0, width, height);

        // Turn the canvas image into a dataURL that can be used as a src for our photo.
        return hidden_canvas[0].toDataURL('image/png');
    }
}


function displayErrorMessage(error_msg, error) {
    error = error || "";
    if (error) {
        console.log(error);
    }

    error_message.innerText = error_msg;

    hideUI();
    error_message.classList.add("visible");
}






function hideUI(ele) {

    $(ele).find('.controls').removeClass('visible');
    $(ele).find('.start-camera').removeClass('visible').hide();
    $(ele).find('.camera-stream').removeClass('visible');
    $(ele).find('#error-message').removeClass('visible');

}








let currentStream;

function stopMediaTracks(stream) {
    stream.getTracks().forEach(track => {
        track.stop();
    });
}

function gotDevices(mediaDevices, ele) {



    if ($(ele).find('.switch-camera').attr('active-camera') == null || $(ele).find('.switch-camera').attr('active-camera') == '') {
        let count = 1;
        mediaDevices.forEach(mediaDevice => {
            if (mediaDevice.kind === 'videoinput') {
                debugger;


                if (count == 1) {
                    $(ele).find('.switch-camera').attr('camera1', mediaDevice.deviceId);

                    $(ele).find('.switch-camera').css('visibility', 'hidden');

                }

                if (count == 2) {
                    $(ele).find('.switch-camera').attr('camera2', mediaDevice.deviceId);

                    $(ele).find('.switch-camera').css('visibility', 'visible');
                }
            }
        });




        if (count == 1) {
            //var event = new Event('click');

            $(ele).find('.switch-camera').attr('active-camera', 'camera1');

            $(ele).find('.switch-camera').trigger('click');
        }





    }




}





function checkUserMedia() {




    navigator.getMedia = (navigator.getUserMedia || // use the proper vendor prefix
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia);

    navigator.getMedia({ video: true }, function () {

   

        
        //if (!$('.camera-container').is(':visible')) {

        //    $('.camera-container').show();

        //}

        $('.camera-container').show();



    }, function () {

        $('.camera-container').hide();




    });


}