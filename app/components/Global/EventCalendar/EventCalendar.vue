<template>
  <div class="event-calendar__wrap">
    <div class="event-calendar b-wrap">
      <h3 class="blc-title">
        Календарь мероприятий
      </h3>
      <div class="event-calendar__content">
        <v-calendar
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'calendar'),
            once: true
          }"
          :locale="{ id: 'ru', masks: { weekdays: 'WW', title: 'MMMM' } }"
          :attributes="attributes"
          :class="{ 'animated-mode': blocksVisibility.calendar }"
          class="event-calendar__calendar clickable-unit"
        />
        <div class="event-calendar__list-wrap">
          <span class="event-calendar__txt">
            На эту дату
          </span>
          <ul class="event-calendar__list">
            <event-calendar-item
              v-for="event in events"
              :key="event.id"
              :item="event"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eventCalendarItem from '~/components/Global/EventCalendar/EventCalendarItem'
import mixins from '~/plugins/mixins'

export default {
  name: 'EventCalendar',
  components: { eventCalendarItem },
  mixins: [ mixins.visibility ],
  data () {
    return {
      attributes: [
        {
          highlight: true,
          dates: [
            new Date(2019, 11, 1),
            new Date(2019, 11, 10),
            new Date(2020, 0, 22)
          ]
        }
      ],
      events: [
        {
          id: 1,
          pic: '/img/event_calendar_pic_1.jpg',
          title: 'Конференция',
          dscr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        },
        {
          id: 2,
          pic: '/img/event_calendar_pic_2.jpg',
          title: 'Конференция',
          dscr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        },
        {
          id: 3,
          pic: '/img/event_calendar_pic_3.jpg',
          title: 'Конференция',
          dscr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        }
      ],
      blocksVisibility: {
        calendar: false
      }
    }
  }
}
</script>

<style lang="scss">
  .event-calendar {
    &__wrap {
      padding-top: 96px;
      padding-bottom: 78px;
      background-color: $dark-blue;

      @include r-max(1700) {
        padding-top: 77px;
      }

      @include r-max(900) {
        padding-top: 60px;
        padding-bottom: 60px;
      }

      @include r-max(480) {
        padding-bottom: 30px;
      }
    }

    .blc-title {
      color: #FFF;

      @include r-max(480) {
        padding-left: 6px;
      }
    }

    &__calendar {
      opacity: 0;
      transform: translateY(-35px);

      &.animated-mode {
        opacity: 1;
        transform: translateY(0);
        transition: all .5s ease;
      }
    }

    &__content {
      display: flex;
      padding-top: 34px;

      @include r-max(1700) {
        padding-top: 37px;
      }

      @include r-max(900) {
        display: block;
      }

      @include r-max(480) {
        padding-top: 20px;
      }
    }

    &__txt {
      display: none;

      @include r-max(1700) {
        display: block;
        font-size: 12px;
        letter-spacing: 0.663094px;
        text-transform: uppercase;
        color: #FFF;
      }
    }

    &__list {
      display: flex;
      margin-top: 2.4vw;

      &-wrap {
        margin-left: 2.6vw;

        @include r-min(2000) {
          margin-left: 51px;
        }

        @include r-max(1700) {
          margin-top: 9px;
          margin-left: 35px;
        }

        @include r-max(900) {
          margin-left: 0;
        }

        @include r-max(480) {
          padding-left: 6px;
          padding-right: 6px;
        }
      }

      @include r-min(2000) {
        margin-top: 46px;
      }

      @include r-max(1700) {
        margin-top: 17px;
      }

      @include r-max(900) {
        justify-content: space-between;
      }

      @include r-max(480) {
        display: block;
      }
    }

    &__item {
      width: 32%;
      margin-left: 16px;
      margin-right: 16px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &:nth-child(-n+2) {
        @include r-max(1700) {
          display: block;
        }
      }

      &:nth-child(2) {
        @include r-max(1700) {
          margin-right: 0;
        }
      }

      &-pic {
        max-width: 400px;
        width: 100%;
        height: 12vw;
        max-height: 230px;
        object-fit: cover;

        @include r-max(1700) {
          max-width: 352px;
          max-height: 198.14px;
          height: 15.5vw;
        }

        @include r-max(900) {
          height: 21.5vw;
        }

        @include r-max(480) {
          max-width: 100%;
          height: 50vw;
        }
      }

      &-title {
        display: block;
        padding-top: 20px;
        padding-bottom: 17px;
        font-size: 24px;
        line-height: 128.91%;
        letter-spacing: 0.25px;
        color: #FFF;
        opacity: 0;
        transform: translateY(25px);

        &.animated-mode {
          opacity: 1;
          transform: translateY(0);
          transition: all .5s ease .5s;
        }

        @include r-max(1700) {
          padding-bottom: 13px;
          font-size: 21px;
        }

        @include r-max(480) {
          padding-top: 13px;
          padding-bottom: 6px;
        }
      }

      &-dscr {
        max-width: 91%;
        font-size: 16px;
        line-height: 160%;
        color: #FFF;
        letter-spacing: 0.25px;
        opacity: 0;
        transform: translateY(25px);

        &.animated-mode {
          opacity: 1;
          transform: translateY(0);
          transition: all .5s ease .5s;
        }

        @include r-max(1700) {
          max-width: 98%;
          font-size: 14px;
        }
      }

      @include r-max(1700) {
        display: none;
        width: 49%;
        max-width: 352px;
      }

      @include r-max(480) {
        width: 100%;
        max-width: 100%;
        margin: 0;
        margin-bottom: 30px;
      }
    }

    @include r-max(480) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
</style>

<style lang="scss">
  @import "event-calendar";
</style>
