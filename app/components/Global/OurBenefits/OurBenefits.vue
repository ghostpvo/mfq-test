<template>
  <div class="benefits b-wrap">
    <h6 class="blc-title">
      {{ mainTitle }}
    </h6>
    <ul class="benefits__list animation-list">
      <our-benefits-item
        v-for="(item, key) in benefits"
        :key="`benefit-${key}`"
        :title="item.title"
        :dscr="item.dscr"
        :pic="item.pic"
      />
    </ul>
  </div>
</template>

<script>
import OurBenefitsItem from './OurBenefitsItem'
export default {
  name: 'OurBenefits',
  components: { OurBenefitsItem },
  data () {
    return {
      mainTitle: 'Преимущества создания офиса с нами',
      benefits: [
        {
          title: 'Современные представительские офисы',
          dscr: 'Офисы в деловом квартале Poklonka Place класса А для компаний, которым важна представительность и адекватная цена. Офисы MANUFAQTURY расположены не более чем в 5 минутах ходьбы от метро Кутузовская, вблизи основной деловой активности и транспортных сетей столицы',
          pic: '/img/our_benefits/our_benefits_1.svg'
        },
        {
          title: 'Интеллектуальное управление офисом',
          dscr: 'Каждый офис оборудован автоматизированной системой управления (ASOM). Доступ в офис осуществляется с использованием биометрических данных или QR-кода. Управлять офисом и платежами, узнавать новости и бронировать переговорки можно с Вашего мобильного телефона',
          pic: '/img/our_benefits/our_benefits_2.svg'
        },
        {
          title: 'Научный подход к созданию офисов',
          dscr: 'Архитектурный стиль MANUFAQTURY создан на базе исследований потребностей офисных сотрудников и отвечает современным требованиям. Над офисами MANUFAQTURY трудится целая лаборатория, учитывая социологические, психологические, дизайнерские аспекты',
          pic: '/img/our_benefits/our_benefits_3.svg'
        },
        {
          title: 'Все что нужно не выходя из Вашего офиса',
          dscr: 'Тренажерный зал, оборудованная кухня, кинотеатр по пятницам, StarBucks и кафе Prime внутри офиса, WINE NIGHTS, премиальные библиотеки с камином, которые вдохновляют',
          pic: '/img/our_benefits/our_benefits_4.svg'
        },
        {
          title: 'CONCIERGE-сервис',
          dscr: 'Community-менеджер MANUFAQTURY встретит Ваших гостей, примет корреспонденцию, закажет такси или цветы в офис. Необходимо только оставить заявку через мобильное приложение',
          pic: '/img/our_benefits/our_benefits_5.svg'
        },
        {
          title: 'Безопасные офисы',
          dscr: 'MANUFAQTURY заботится о безопасности людей и данных. Доступ в офис возможен по биометрическим данным, а провайдер разрешает выделенную линию связи и интернета',
          pic: '/img/our_benefits/our_benefits_6.svg'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .benefits {
    padding-top: 95px;
    padding-bottom: 50px;

    &__list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 48px;
      margin-left: -31px;

      @include r-max(1700) {
        margin-top: 41px;
        margin-left: -16px;
      }

      @include r-max(900) {
        margin-left: 0;
      }

      @include r-max(480) {
        margin-top: 26px;
      }
    }

    @include r-max(1700) {
      padding-top: 80px;
    }

    @include r-max(900) {
      padding-top: 60px;
    }

    @include r-max(480) {
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }
</style>
