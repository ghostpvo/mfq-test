<template>
  <!-- Времменное решение, пока не появятся новые офисы -->
  <!--  Снизу закоментирован слайдер, для варианта с большим количеством городов и мест-->
  <h3 class="blc-title" style="padding: 95px 0 0; text-align: center;">
    <!--Мы создаем офисы-->
  </h3>
<!--  <nav id="locations" class="locations__nav">-->
<!--    <h3 class="locations__nav-title">-->
<!--      Где хотите работать?-->
<!--    </h3>-->
<!--    <div class="locations__nav-cities">-->
<!--      <slick-->
<!--        ref="main-slider"-->
<!--        :options="slickOptionsFirst"-->
<!--        @afterChange="rebuildPlaces"-->
<!--        class="locations__nav-front"-->
<!--      >-->
<!--        <div-->
<!--          v-for="(location, index) in cities"-->
<!--          :key="`location-${index}`"-->
<!--        >-->
<!--          <span class="locations__nav-front-signature">-->
<!--            {{ location.title }}-->
<!--          </span>-->
<!--        </div>-->
<!--      </slick>-->
<!--      <slick-->
<!--        :options="slickOptionsSecond"-->
<!--        class="locations__nav-back"-->
<!--      >-->
<!--        <div-->
<!--          v-for="(location, index) in cities"-->
<!--          :key="`location-${index}`"-->
<!--        >-->
<!--          <span class="locations__nav-back-signature">-->
<!--            {{ location.title }}-->
<!--          </span>-->
<!--        </div>-->
<!--      </slick>-->
<!--    </div>-->
<!--    <div-->
<!--      ref="nav-places"-->
<!--      v-if="cities.length > 0"-->
<!--      class="locations__nav-places"-->
<!--    >-->
<!--      <span-->
<!--        v-for="(place, index) in cities[currentLocation].locations"-->
<!--        :key="`place-${index}`"-->
<!--        @click="setLocation(index)"-->
<!--        class="locations__nav-place clickable-unit"-->
<!--      >-->
<!--        {{ place.title }}-->
<!--      </span>-->
<!--    </div>-->
<!--  </nav>-->
</template>

<script>
export default {
  name: 'AllLocations',
  props: {
    cities: {
      type: Array,
      default: () => [
        {
          title: 'москва',
          locations: [
            {
              title: 'церрера'
            },
            {
              title: 'фобос'
            },
            {
              title: 'деймос'
            },
            {
              title: 'квавар'
            },
            {
              title: 'седна'
            },
            {
              title: 'ерида'
            }
          ]
        },
        {
          title: 'санкт-перербург',
          locations: [
            {
              title: 'фобос'
            },
            {
              title: 'деймос'
            },
            {
              title: 'квавар'
            },
            {
              title: 'седна'
            }
          ]
        },
        {
          title: 'екатеринбург',
          locations: [
            {
              title: 'деймос'
            },
            {
              title: 'квавар'
            }
          ]
        },
        {
          title: 'ио',
          locations: [
            {
              title: 'Юритер'
            },
            {
              title: 'ганимед'
            }
          ]
        },
        {
          title: 'калисто',
          locations: [
            {
              title: 'европа'
            }
          ]
        },
        {
          title: 'европа',
          locations: [
            {
              title: 'калисто'
            }
          ]
        },
        {
          title: 'ганимед',
          locations: [
            {
              title: 'калисто'
            },
            {
              title: 'европа'
            }
          ]
        }
      ]
    }
  },
  data () {
    return {
      slickOptionsFirst: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: true,
        draggable: false,
        // fade: true,
        asNavFor: '.locations__nav-back',
        responsive: [
          {
            breakpoint: 951,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '55px'
            }
          },
          {
            breakpoint: 540,
            settings: {
              centerPadding: '0'
            }
          }
        ]
      },
      slickOptionsSecond: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        arrows: true,
        dots: false,
        infinite: true,
        draggable: false,
        asNavFor: '.locations__nav-front',
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 951,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '55px'
            }
          }
        ]
      },
      currentLocation: 0,
      offers: [
        {
          id: 1,
          linkTo: '/img/office_placeholder.jpg',
          pic: '/img/office_demo_offer_1.png',
          title: 'Офисы от 15 м<sup>2</sup> до 3000 м<sup>2</sup>',
          instStory: true,
          subtitles: [
            {
              id: 1,
              title: 'от 2 человек до 400 человек'
            }
          ]
        },
        {
          id: 2,
          linkTo: '/img/office_placeholder.jpg',
          pic: '/img/office_demo_offer_2.png',
          title: 'Конференц-зал 430 м<sup>2</sup>',
          subtitles: [
            {
              id: 1,
              title: '400 человек театром'
            },
            {
              id: 2,
              title: '210 человек в банкетной рассадке'
            }
          ]
        }
      ]
    }
  },
  created () {
    if (this.cities.length > 0) {
      this.$emit('input', this.cities[0].locations[0])
    }
  },
  methods: {
    rebuildPlaces (event, slick, currentSlide) {
      this.currentLocation = currentSlide
      this.$emit('input', this.cities[this.currentLocation].locations[0])
    },
    setLocation (index) {
      this.$emit('input', this.cities[this.currentLocation].locations[index])
    }
  }
}
</script>

<style lang="scss">
  @import "all-locations";
</style>
