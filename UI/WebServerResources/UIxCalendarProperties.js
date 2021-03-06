/* -*- Mode: java; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

function onLoadCalendarProperties() {
    var tabsContainer = $("propertiesTabs");
    var controller = new SOGoTabsController();
    controller.attachToTabsContainer(tabsContainer);

    var colorButton = $("colorButton");
    var calendarColor = $("calendarColor");
    colorButton.setStyle({ "backgroundColor": calendarColor.value, display: "inline" });
    colorButton.observe("click", onColorClick);
    
    var cancelButton = $("cancelButton");
    cancelButton.observe("click", onCancelClick);
    
    var okButton = $("okButton");
    okButton.observe("click", onOKClick);
}

function onCancelClick(event) {
    window.close();
}

function onOKClick(event) {
  var calendarName = $("calendarName");
  var calendarColor = $("calendarColor");
  var calendarID = $("calendarID");
  var save = true;
  var tag = $("calendarSyncTag");
  var originalTag = $("originalCalendarSyncTag");
  var allTags = $("allCalendarSyncTags");

  if (calendarName.value.blank()) {
      alert(_("Please specify a calendar name."));
      save = false;
  }

  if (save
      && allTags)
      allTags = allTags.value.split(",");
  
  if (save
      && tag
      && $("synchronizeCalendar").checked) {
      if (tag.value.blank()) {
          alert(_("tagNotDefined"));
          save = false;
      }
      else if (allTags
               && allTags.indexOf(tag.value) > -1) {
          alert(_("tagAlreadyExists"));
          save = false;
      }
      else if (originalTag
               && !originalTag.value.blank()) {
          if (tag.value != originalTag.value)
              save = confirm(_("tagHasChanged"));
      }
      else
          save = confirm(_("tagWasAdded"));
  }
  else if (save
           && originalTag
           && !originalTag.value.blank())
      save = confirm(_("tagWasRemoved"));
  
  if (save) {
      window.opener.updateCalendarProperties(calendarID.value,
                                             calendarName.value,
                                             calendarColor.value);
      $("propertiesform").submit();
  }
  else
      Event.stop(event);
}

function onColorClick(event) {
  var cPicker = window.open(ApplicationBaseURL + "colorPicker", "colorPicker",
                            "width=250,height=200,resizable=0,scrollbars=0"
                            + "toolbar=0,location=0,directories=0,status=0,"
                            + "menubar=0,copyhistory=0", "test"
                            );
  cPicker.focus();
  
  preventDefault(event);
}

function onColorPickerChoice(newColor) {
  var colorButton = $("colorButton");
  colorButton.setStyle({ "backgroundColor": newColor });
  var calendarColor = $("calendarColor");
  calendarColor.value = newColor;
}

document.observe("dom:loaded", onLoadCalendarProperties);
