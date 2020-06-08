import $ from "jquery";

var passCount = 0;
var failedCount = 0;
var passedTests = [];
var failedTests = [];

$(window).on("testResult", function() {
  if (window.result.id === "ExtraProductSubId") {
    passCount++;
    passedTests.push("ID is equal to Prepaid Product ID");
  } else {
    failedCount++;
    failedTests.push("ID is different to Prepaid Product ID");
  }

  if (window.result.subscription_type === "prepaid") {
    passCount++;
    passedTests.push("Subscription type is equal to Prepaid");
  } else {
    failedCount++;
    failedTests.push("Subscription type is different to Prepaid");
  }
  let variantIsPresent = false;
  $(window.SecondProduct.subscription_data.variants).each(function(index, el) {
    if (el.id === window.result.variant_id) {
      variantIsPresent = true;
      return false;
    }
  });

  if (variantIsPresent) {
    passCount++;
    passedTests.push(
      "The variant ID matches with any Prepaid subscription variant"
    );
  } else {
    failedCount++;
    failedTests.push(
      "The variant ID donesn't match with any Prepaid product subscription variant"
    );
  }

  if (passCount > 0) {
    $(".passed-tests").show();
    $(".passed-tests__count").html(passCount);
    $(".passed-tests__list").html("");
    $(passedTests).each(function(key, value) {
      let listItem = `<li>${value}</li>`;
      $(".passed-tests__list").append(listItem);
    });
    passedTests = [];
    passCount = 0;
  } else {
    $(".passed-tests").hide();
  }
  if (failedCount > 0) {
    $(".failed-tests").show();
    $(".failed-tests__count").html(failedCount);
    $(".failed-tests__list").html("");
    $(failedTests).each(function(key, value) {
      let listItem = `<li>${value}</li>`;
      $(".failed-tests__list").append(listItem);
    });
    failedTests = [];
    failedCount = 0;
  } else {
    $(".failed-tests").hide();
  }
});
