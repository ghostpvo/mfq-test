<template>
  <div
    v-observe-visibility="{
      callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'screenMode'),
      once: true,
      throttle: 700
    }"
    :class="{ 'animated-mode': blocksVisibility.screenMode }"
    class="find-offices"
  >
    <div
      v-if="showFilter"
      class="filter b-wrap"
    >
      <h4 class="filter__title">
        {{ mainTitle }}
      </h4>
      <div v-if="true" class="filter__list-wrap">
        <div class="filter__list">
          <div v-if="chooseCountry" class="filter__input-wrap">
            <main-select
              :title="'Страна/Город'"
              :options="['Россия', 'Белорусь', 'Казахстан']"
              :placeholder="'Выберите страну'"
              v-model="office.country"
            />
          </div>
          <div v-if="eventType" class="filter__input-wrap">
            <main-select
              :title="'Тип мероприятия'"
              :options="eventTypeOptions"
              :placeholder="'Выберите тип'"
              v-model="office.eventTypes"
            />
          </div>
          <div v-if="peopleAmountFilter" class="filter__input-wrap">
            <main-input
              :title="'Количество человек'"
              :placeholder="'от 1 до 1200'"
              :type="'number'"
              v-model="office.peopleAmount"
            />
          </div>
          <div v-if="meterFilter" class="filter__input-wrap">
            <main-input
              :title="'Метраж'"
              :placeholder="'от 1 до 1200'"
              :type="'number'"
              v-model="office.meter"
            />
          </div>
          <div v-if="metroFilter" class="filter__input-wrap">
            <main-select
              :title="'Метро'"
              :options="metroOptions"
              :placeholder="'Выберите метро'"
              v-model="office.metro"
            />
          </div>
          <div v-if="choseWorkspace" class="filter__input-wrap">
            <main-select
              :title="'Площадка'"
              :options="locationOptions"
              :placeholder="'Выберите площадку'"
              v-model="office.workspace"
            />
          </div>
          <div v-if="roomTypes" class="filter__input-wrap">
            <main-select
              :title="'Тип помещения'"
              :options="['Тип 1', 'Тип 2', 'Тип 3']"
              :placeholder="'Выберите тип'"
              v-model="office.roomType"
            />
          </div>
          <div v-if="specialOffer" class="filter__input-wrap checkbox">
            <main-checkbox
              :id="'specialOffers-s'"
              :label="'Специальные предложения'"
              :value="'Специальные предложения'"
              v-model="office.specialOffers"
            />
          </div>
          <div class="filter__input-wrap button">
            <button @click="search" class="btn-blue clickable-unit">
              {{ btnTitle }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="b-wrap">
      <office-list
        v-if="items.length > 0"
        :items="items"
        :showShortInfo="showShortInfo"
        :showLocationInItem="showLocationInItem"
        :haveBiggerTitle="haveBiggerTitle"
        @clicked="$emit('clicked')"
      />
      <div
        v-else
        style="text-align: center;
    margin-top: 1em;
    font-size: 2em;
}"
      >
        По вашему запросу ничего не найдено
      </div>
    </div>
  </div>
</template>

<script>
import MainSelect from '../../Elements/StyledInputs/MainSelect/MainSelect'
import MainInput from '../../Elements/StyledInputs/MainInput/MainInput'
import MainCheckbox from '../../Elements/StyledInputs/MainCheckbox/MainCheckbox'
import OfficeList from '../../Elements/OfficeListOfItems/OfficeList'
import mixins from '~/plugins/mixins'

export default {
  name: 'FindOffices',
  components: { OfficeList, MainCheckbox, MainInput, MainSelect },
  mixins: [ mixins.visibility ],
  props: {
    showShortInfo: {
      type: Boolean,
      default: true
    },
    showLocationInItem: {
      type: Boolean,
      default: false
    },
    haveBiggerTitle: {
      type: Boolean,
      default: false
    },
    mainTitle: {
      type: String,
      default: 'Найти офис'
    },
    peopleAmountFilter: {
      type: Boolean,
      default: false
    },
    meterFilter: {
      type: Boolean,
      default: false
    },
    metroFilter: {
      type: Boolean,
      default: false
    },
    specialOffer: {
      type: Boolean,
      default: false
    },
    eventType: {
      type: Boolean,
      default: false
    },
    choseWorkspace: {
      type: Boolean,
      default: false
    },
    chooseCountry: {
      type: Boolean,
      default: false
    },
    roomTypes: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    btnTitle: {
      type: String,
      default: 'поиск'
    },
    showFilter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      office: {},
      specialOffers: [
        {
          value: 'Специальные предложения',
          label: 'Специальные предложения'
        }
      ],
      blocksVisibility: {
        screenMode: false
      },
      eventTypeOptions: [
        { label: 'Конференция', value: 'conference' },
        { label: 'Воркшоп / митап', value: 'workshop' },
        { label: 'Церемония', value: 'ceremony' },
        { label: 'DemoDay', value: 'DemoDay' },
        { label: 'Выставка', value: 'exhibition' },
        { label: 'Презентация', value: 'presentation' },
        { label: 'Другое', value: 'other' }
      ],
      locationOptions: [],
      metroOptions: []
    }
  },
  async mounted () {
    const locations = await this.$store.dispatch('locations/FETCH_LOCATIONS')
    locations.forEach((el) => {
      this.locationOptions.push({ label: el.fullData.title, value: el.id })
    })
    const metro = await this.$store.dispatch('metro/GET_METRO')
    metro.forEach((el) => {
      this.metroOptions.push({ label: el.title, value: el.id })
    })
  },
  methods: {
    search () {
      this.$emit('search', this.office)
    }
  }
}
</script>

<style lang="scss" scoped>
  .find-offices {
    padding-top: 100px;
    padding-bottom: 50px;

    .filter {
      padding-bottom: 35px;
      text-align: center;

      &__title {
        display: block;
        padding-bottom: 27px;
        font-size: 34px;
        letter-spacing: 0.25px;
        text-transform: uppercase;
        word-spacing: 8px;
        opacity: 0;
        transform: translateY(-15px);
        transition: all .75s ease-out;

        @include r-max(1700) {
          padding-bottom: 25px;
        }

        @include r-max(900) {
          padding-bottom: 10px;
          font-size: 21px;
        }

        @include r-max(480) {
          padding-bottom: 23px;
          font-size: 24px;
        }
      }

      &__list {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: flex-end;
        padding-top: 21px;
        justify-content: center;
        opacity: 0;
        transform: translateY(15px);
        transition: all .75s ease-out .75s;

        &-wrap {
          display: inline-block;
          max-width: 100%;
          border-top: 1px solid $txt-color;

          @include r-max(900) {
            width: 100%;
          }
        }

        @include r-max(1700) {
          padding-top: 23px;
        }

        @include r-max(1180) {
          flex-wrap: wrap;
        }

        @include r-max(480) {
          padding-top: 23px;
        }
      }

      &__input-wrap {
        width: 240px;
        max-width: 100%;
        margin-right: 32px;
        text-align: left;

        &:last-child {
          margin-right: 0;

          @include r-max(900) {
            padding-left: 0;
            padding-right: 0;
          }
        }

        &.checkbox {
          @include r-min (1701) {
            max-width: 176px;
          }

          @include r-min-max(901, 1700) {
            max-width: 144px;
          }
        }

        &.button {
          @include r-max(900) {
            width: 250px;
            margin-left: auto;
            margin-right: auto;
          }

          @include r-max(480) {
            width: 100%;
          }
        }

        @include r-max(1700) {
          width: 192px;
          margin-right: 30px;
        }

        @include r-max(1180) {
          margin-bottom: 20px;
        }

        @include r-max(900) {
          width: 50%;
          padding-right: 15px;
          padding-left: 15px;
          margin-right: 0;

          &:nth-child(2n+2) {
             padding-right: 0;
          }

          &:nth-child(2n+1) {
            padding-left: 0;
          }
        }

        @include r-max(480) {
          width: 100%;
          padding-left: 0;
          padding-right: 0;
          margin-bottom: 16px;
        }
      }

      @include r-max(1700) {
        padding-bottom: 0;
      }
    }

    &.animated-mode {
      .filter {
        &__title,
        &__list {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    @include r-max(1700) {
      padding-top: 80px;
      padding-bottom: 44px;
    }

    @include r-max(900) {
      padding-top: 50px;
      padding-bottom: 20px;
    }

    @include r-max(480) {
      padding-top: 60px;
      padding-bottom: 0;
    }
  }
</style>
