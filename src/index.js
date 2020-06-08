/*
 *
 * Given two different products with the exact same data structure
 * (FirstProduct and SecondProduct) we need to include the second product
 * subscription data to the form you see on the broswer tab
 * on the right.
 *
 * Currently the form handles the Regular Product data and Subscription product data
 * both contained on the FirstProduct object.
 *
 * Your task is to add the subscription data from the second product to the
 * form and submit it correctly for testing.
 *
 * The template is found on index.html on the script data #product-data.
 *
 * The product objects are found below this lines.
 *
 * This excercise was taken from the inteagration of the first party app Recharge
 * into a shopify store, and its simulating the data that the app needs to append
 * to the product form in order to fulfill an order with a different product
 * which wasn't part of the original out of the box feature.
 *
 */

import "./styles.css";
import $ from "jquery";
import Handlebars from "handlebars";
import objectifier from "objectify-query-string";

window.FirstProduct = {
  name: "Product 1",
  id: "p1",
  variants: [
    {
      id: "RegProduct1",
      name: "Size 1 / Color 1"
    },
    {
      id: "RegProduct2",
      name: "Size 2 / Color 2"
    },
    {
      id: "RegProduct3",
      name: "Size 3 / Color 3"
    },
    {
      id: "RegProduct4",
      name: "Size 4 / Color 4"
    }
  ],
  subscription_data: {
    variants: [
      {
        id: "SubProductVariant1",
        name: "Sub Variant Size 1 / Sub Variant Color 1"
      },
      {
        id: "SubProductVariant2",
        name: "Sub Variant Size 2 / Sub Variant Color 2"
      },
      {
        id: "SubProductVariant3",
        name: "Sub Variant Size 3 / Sub Variant Color 3"
      },
      {
        id: "SubProductVariant4",
        name: "Sub Variant Size 4 / Sub Variant Color 4"
      }
    ],
    subscription_id: "SubProduct1",
    subscription_type: "recurring"
  }
};

window.SecondProduct = {
  name: "Extra Product",
  id: "ExtraProductId",
  variants: [
    {
      id: "ExtraProductVariantId-1",
      name: "Size 1 / Color 1"
    },
    {
      id: "ExtraProductVariantId-2",
      name: "Size 2 / Color 2"
    },
    {
      id: "ExtraProductVariantId-3",
      name: "Size 3 / Color 3"
    },
    {
      id: "ExtraProductVariantId-4",
      name: "Size 4 / Color 4"
    }
  ],
  subscription_data: {
    variants: [
      {
        id: "ExtraProductSubVariantId-1",
        name: "ExtraProduct Size 1 / ExtraProduct Color 1"
      },
      {
        id: "ExtraProductSubVariantId-2",
        name: "ExtraProduct Size 2 / ExtraProduct Color 2"
      },
      {
        id: "ExtraProductSubVariantId-3",
        name: "ExtraProduct Size 3 / ExtraProduct Color 3"
      },
      {
        id: "ExtraProductSubVariantId-4",
        name: "ExtraProduct Size 4 / ExtraProduct Color 4"
      }
    ],
    id: "ExtraProductSubId",
    subscription_type: "recurring"
  }
};

var data = $("#product-data").html();
var template = Handlebars.compile(data);
$("#product").html(template(window.FirstProduct));

function changeTemplateData(e) {
  window.result = {};
  let value = "";
  if (typeof e !== "undefined") {
    value = $(e.currentTarget).val();
  } else {
    value = $('[name="subscription_type"]:checked').val();
  }

  switch (value) {
    case "subscription":
      $("#variantId").attr("name", "");
      $("[data-clone-variant]").attr("name", "variant_id");
      $("[data-subscription-id]").attr("name", "subscription-id");
      break;

    case "regular":
      $("#variantId").attr("name", "varaint-id");
      break;
    default:
      break;
  }
  window.result = objectifier.objectify($("form").serialize());
  $("#result").html(window.result);
  $(window).trigger("testResult");
}

function changeActivevariant(e) {
  var $this = $(e.currentTarget);
  var activeOptionIndex = $this.find("option:selected").index();
  var cloneVariantValue = $("[data-clone-variant] option")
    .eq(activeOptionIndex)
    .val();
  $("[data-clone-variant]").val(cloneVariantValue);
  changeTemplateData();
  window.result = $("form").serialize();
}

$("#variant-id").on("change", changeActivevariant);
$('input[name="subscription_type"]').on("change", changeTemplateData);
setTimeout(function() {
  $(window).trigger("testResult");
}, 500);
