//******* Helper Functions ******

function catchError(error) {
  // Handle network errors or other exceptions here
  console.error("Error:", error);
  $(".data-container").html(
    "<div class='text-center vh-90 d-flex justify-content-center flex-column gap-4 align-items-center my-2'><h2>Bad Connection try again later</h2> <button class='btn btn-outline-danger sub-btn retry-btn'>Try Again <i class='fa-solid fa-rotate-right'></i> </button></div>"
  );
  $(".retry-btn").on("click", () => {
    window.location.reload();
  });
}
function getRecipes(meal) {
  let listRec = "";
  for (
    i = 1;
    i < 21 &&
    meal["strIngredient" + i] != "" &&
    meal["strIngredient" + i] != null;
    i++
  ) {
    listRec += `
  <li class="recipe-tag">${meal["strIngredient" + i]}</li>
`;
  }
  return listRec;
}
function getTags(meal) {
  let listTag = "";
  if (meal.strTags) {
    let tags = meal.strTags.split(",");
    for (i = 0; i < tags.length; i++) {
      listTag += `
  <li class="tag">${tags[i]}</li>
  `;
    }
  } else {
    listTag = `<li class="tag">No Tags</li>
    `;
  }
  return listTag;
}

function newDisplay(meals) {
  $(".spinner").show(0, () => {
    $(".loading-screen").show(0);
    $("body,html").css("overflow", "hidden");
  });
  displayData(meals);
  $(".spinner").fadeOut(1700, () => {
    $(".loading-screen").fadeOut(700);
    $("body,html").css("overflow", "auto");
  });
}

//******* Events ******

$(".search-btn")
  .on("click", () => {
    $(".spinner").show(0, () => {
      $(".loading-screen").show(0);
      $("body,html").css("overflow", "hidden");
    });
    $(".search-box").removeClass("d-none");
    $(".data-container").html("");
    $(".spinner").fadeOut(1700, () => {
      $(".loading-screen").fadeOut(700);
      $("body,html").css("overflow", "auto");
    });
  })
  .closest("li")
  .siblings()
  .find("a")
  .on("click", () => {
    $(".search-box").addClass("d-none");
  });
$(".category-btn").on("click", () => {
  getCategories();
});
$(".area-btn").on("click", () => {
  getAreas();
});
$(".intr-btn").on("click", () => {
  getIntrs();
});
$(".contact-btn")
  .on("click", () => {
    $(".spinner").show(0, () => {
      $(".loading-screen").show(0);
      $("body,html").css("overflow", "hidden");
    });
    $(".data-container").html("");
    $(".form-box").removeClass("d-none");
    $(".wrong-input").addClass("d-none");
    $(".form-inputs").val("");
    $(".spinner").fadeOut(400, () => {
      $(".loading-screen").fadeOut(300);
      $("body,html").css("overflow", "auto");
    });
  })
  .closest("li")
  .siblings()
  .find("a")
  .on("click", () => {
    $(".form-box").addClass("d-none");
    $(".wrong-input").addClass("d-none");
    $(".form-inputs").val("");
  });

//******* Get Data ******

async function getDetails(id) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    const meal = await data.meals[0];
    $(".spinner").show(0, () => {
      $(".loading-screen").show(0);
      $("body,html").css("overflow", "hidden");
    });
    displayDetails(meal);
    $(".spinner").fadeOut(1700, () => {
      $(".loading-screen").fadeOut(700);
      $("body,html").css("overflow", "auto");
    });
  } catch (error) {
    catchError();
  }
}
async function getCategories() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    const data = await response.json();
    const category = await data.categories;
    $(".spinner").show(0, () => {
      $(".loading-screen").show(0);
      $("body,html").css("overflow", "hidden");
    });
    displayCategories(category);
    $(".spinner").fadeOut(1700, () => {
      $(".loading-screen").fadeOut(700);
      $("body,html").css("overflow", "auto");
    });
  } catch (error) {
    catchError();
  }
}
async function getCategoryDetails(catName) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`
    );
    const data = await response.json();
    const meals = await data.meals;

    if (meals != undefined && meals.length === 0) {
      // Run the catchError function if meals are empty
      catchError(new Error("Meals are empty."));
    } else {
      newDisplay(meals);
    }
  } catch (error) {
    catchError(error);
  }
}
async function getAreas() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const data = await response.json();
    const area = await data.meals;
    $(".spinner").show(0, () => {
      $(".loading-screen").show(0);
      $("body,html").css("overflow", "hidden");
    });
    displayAreas(area);
    $(".spinner").fadeOut(1700, () => {
      $(".loading-screen").fadeOut(700);
      $("body,html").css("overflow", "auto");
    });
  } catch (error) {
    catchError();
  }
}
async function getAreaDetails(area) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const data = await response.json();
    const meals = await data.meals;
    newDisplay(meals);
  } catch (error) {
    catchError();
  }
}

async function getIntrs() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    const data = await response.json();
    const Intr = await data.meals;
    $(".spinner").show(0, () => {
      $(".loading-screen").show(0);
      $("body,html").css("overflow", "hidden");
    });
    displayIntrs(Intr);
    $(".spinner").fadeOut(1700, () => {
      $(".loading-screen").fadeOut(700);
      $("body,html").css("overflow", "auto");
    });
  } catch (error) {
    catchError();
  }
}
async function getIntrDetails(intr) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${intr}`
    );
    const data = await response.json();
    const meals = await data.meals;
    newDisplay(meals);
  } catch (error) {
    catchError();
  }
}
//******* Display Data ******

function displayData(meals) {
  let box = "";
  for (let i = 0; i < meals.length && i < 19; i++) {
    const meal = meals[i]; // Get the current meal
    if (meal.idMeal) {
      // Check if idMeal exists
      box += `
        <div class="col-md-3">
          <div onclick="getDetails('${meal.idMeal}')" class="meal-box rounded-2 overflow-hidden">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid"/>
            <div class="meal-overlay">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        </div>`;
    }
  }

  $(".data-container")
    .html(box)
    .addClass("g-3")
    .removeClass("g-4")
    .removeClass("g-5");
}

function displayDetails(meal) {
  let box = `

            <div class="col-lg-4">
              <div class="rounded-2 overflow-hidden">
                <img
                  src="${meal.strMealThumb}"
                  alt="${meal.strMeal}"
                  class="img-fluid"
                />
              </div>
              <h3 class="mt-3 fw-bold">${meal.strMeal}</h3>
            </div>
            <div class="col-lg-8">
              <div class="details-box">
                <h2 class="mb-2">Instructions :</h2>
                <p class="mb-5">${meal.strInstructions}</p>
                <h2 class="mb-5">Area : <strong>${meal.strArea}</strong></h2>
                <h2 class="mb-5">Category : <strong>${
                  meal.strCategory
                }</strong></h2>
                <h2 class="mb-2">Recipes :</h2>
                <ul class="d-flex gap-3 flex-wrap list-unstyled mb-5">${getRecipes(
                  meal
                )}
                </ul>
                <h2 class="mb-2">Tags :</h2>
                <ul class="d-flex gap-3 flex-wrap list-unstyled mb-5">
                  ${getTags(meal)}
                  
                </ul>
                <div class="attached-src d-flex gap-2">
                  <a target="_blank" href="${
                    meal.strSource
                  }" class="btn btn-success d-inline-block">Source</a>
                  <a target="_blank" href="${
                    meal.strYoutube
                  }" class="btn btn-danger d-inline-block">Youtube</a>
                </div>
              </div>
            </div>
          
  `;
  $(".data-container")
    .html(box)
    .addClass("g-4")
    .removeClass("g-3")
    .removeClass("g-5");
  $(".search-box").addClass("d-none").find("input").val("");
}
function displayCategories(category) {
  let box = "";
  for (i = 0; i < category.length; i++) {
    box += `
    <div class="col-lg-3">
    <div onclick="getCategoryDetails('${category[i].strCategory}')" class="meal-box rounded-2 overflow-hidden text-center">
      <img
        src="${category[i].strCategoryThumb}"
        alt="${category[i].strCategory}"
        class="img-fluid"
      />
      <div class="meal-overlay d-flex flex-column">
        <h3>${category[i].strCategory}</h3>
        <p class="text-description">${category[i].strCategoryDescription}</p>
      </div>
    </div>
  </div>
    
    `;
    $(".data-container")
      .html(box)
      .addClass("g-3")
      .removeClass("g-4")
      .removeClass("g-5");
  }
}

function displayAreas(area) {
  let box = "";
  for (i = 0; i < area.length; i++) {
    box += `
    <div class="col-lg-3">
    <div onclick="getAreaDetails('${area[i].strArea}')" class="meal-box rounded-2 overflow-hidden text-center px-4">
       <i class="fa-solid fa-laptop-house"></i>
       <h2 class="fw-semibold fs-3">${area[i].strArea}</h2>
    </div>
    </div>
    `;
    $(".data-container")
      .html(box)
      .addClass("g-5")
      .removeClass("g-4")
      .removeClass("g-3");
  }
}

function displayIntrs(Intr) {
  let box = "";
  for (i = 0; i < Intr.length && i < 21; i++) {
    box += `
    <div class="col-lg-3 col-md-6">
    <div  
    onclick="getIntrDetails('${Intr[i].strIngredient.split(" ").join("_")}')"
     class="meal-box rounded-2 overflow-hidden text-center">
      <i class="fa-solid fa-drumstick-bite"></i>
      <h2 class="fw-semibold fs-4 my-2">${Intr[i].strIngredient}</h2>
      <p class="text-description">
      ${Intr[i].strDescription}
      </p>
    </div>
  </div>

    `;
    $(".data-container")
      .html(box)
      .addClass("g-4")
      .removeClass("g-5")
      .removeClass("g-3");
  }
}

//******* Loading Screen ******
$(function () {
  $(".spinner").fadeOut(1700, () => {
    $(".loading-screen").fadeOut(700);
    $("body,html").css("overflow", "auto");

    $(".nav-container").animate({ width: "toggle" }, 500);
  });

  //******* Navegation ******

  function menuAction() {
    $(".btn-menu").toggleClass("fa-close").toggleClass("fa-bars");
    $(".nav-container").animate({ width: "toggle" }, 500);
    if ($(".btn-menu").hasClass("fa-close")) {
      $(".nav-list").animate({ padding: "0" }, 450);
    } else {
      $(".nav-list").animate({ paddingTop: "200px" }, 600);
    }
    $("nav .nav-list li").toggleClass("animate__slideInUp");
  }

  $(".btn-menu").on("click", () => {
    menuAction();
  });
  $("nav .nav-list li").on("click", ({ target }) => {
    $(target)
      .addClass("active")
      .closest("li")
      .siblings()
      .find("a")
      .removeClass("active");
    menuAction();
  });

  //******* Get&Display Data Default ******

  getDataByName("");
  $(".search-name").on("input", () => {
    getDataByName($(".search-name").val());
  });

  async function getDataByName(name) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.meals === null || data.meals.length === 0) {
        // Clear the content of .data-container
        $(".data-container").html("");
      } else {
        displayData(data.meals);
      }
    } catch (error) {
      catchError();
    }
  }

  $(".search-letter").on("input", () => {
    getDataByFirstLetter($(".search-letter").val());
  });
});
async function getDataByFirstLetter(letter) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.meals === null || data.meals.length === 0) {
      // Clear the content of .data-container
      $(".data-container").html("");
    } else {
      displayData(data.meals);
    }
  } catch (error) {
    catchError();
  }
}
//******* Form Validation ********/
function nameValidation() {
  const regex = /^[a-zA-Z ]{3,21}$/;
  return regex.test($(".name-input").val());
}

function emailValidation() {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test($(".email-input").val());
}

function phoneValidation() {
  const regex = /^(?:\+20|0)[1-9]\d{8}$/;
  return regex.test($(".phone-input").val());
}
function ageValidation() {
  const regex = /^[1-9][0-9]{0,1}$/;
  return regex.test($(".age-input").val());
}
function passwordValidation() {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test($(".password-input").val());
}
function repassValidation() {
  const regex = $(".password-input").val();
  return $(".repass-input").val() === regex;
}

$(".name-input").on("input", () => {
  if (!nameValidation()) {
    $(".name-wrong").removeClass("d-none");
  } else {
    $(".name-wrong").addClass("d-none");
  }
});
$(".email-input").on("input", () => {
  if (!emailValidation()) {
    $(".email-wrong").removeClass("d-none");
  } else {
    $(".email-wrong").addClass("d-none");
  }
});
$(".phone-input").on("input", () => {
  if (!phoneValidation()) {
    $(".phone-wrong").removeClass("d-none");
  } else {
    $(".phone-wrong").addClass("d-none");
  }
});
$(".age-input").on("input", () => {
  if (!ageValidation()) {
    $(".age-wrong").removeClass("d-none");
  } else {
    $(".age-wrong").addClass("d-none");
  }
});
$(".password-input").on("input", () => {
  if (!passwordValidation()) {
    $(".pass-wrong").removeClass("d-none");
  } else {
    $(".pass-wrong").addClass("d-none");
  }
});
$(".repass-input").on("input", () => {
  if (!repassValidation()) {
    $(".repass-wrong").removeClass("d-none");
  } else {
    $(".repass-wrong").addClass("d-none");
  }
});

$(".form-inputs").on("input", () => {
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repassValidation()
  ) {
    $(".sub-btn").removeAttr("disabled");
  }
});
$(".sub-btn").on("click", (e) => {
  e.preventDefault();
  $(".spinner").show(0, () => {
    $(".loading-screen").show(0);
    $("body,html").css("overflow", "hidden");
  });

  $(".data-container").html(
    "<div class='text-center vh-90 d-flex justify-content-center flex-column gap-4 align-items-center my-2'><h2>Thanks For Registration ❤ </h2> <button class='btn btn-outline-success back-btn'>Back To Home <i class='fa-solid fa-backward'></i> </button></div>"
  );
  $(".spinner").fadeOut(1700, () => {
    $(".loading-screen").fadeOut(700);
    $("body,html").css("overflow", "auto");
  });
  $(".back-btn").on("click", () => {
    window.location.reload();
  });
});
