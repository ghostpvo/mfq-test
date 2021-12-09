<template>
    <div class="p">
        <div class="b-wrap">
            <h4 class="blc-title">
                СЕРВИСЫ ДЛЯ РЕЗИДЕНТОВ
            </h4>
            <div class="p__g-wrap">
                <!--ВАЖНО - дубликат основной картинки, необходимо для формирования разметки в моб версии-->
                <div
                        v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'imageMob'),
            once: true
          }"
                        :class="{ 'animated-mode': blocksVisibility.imageMob }"
                        class="p__pic-mob lazy-image lazy-image--left"
                >
                    <img
                            src="~static/img/ex/office-ex.jpg"
                            alt=""
                    >
                </div>
                <ul
                        v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'list'),
            once: true,
            throttle: 500
          }"
                        :class="{ 'animated-mode': blocksVisibility.list }"
                        class="p__list"
                >
                    <li
                            v-for="(item, index) in items"
                            :key="`item-${index}`"
                            v-html="item.txt"
                            class="list-items"
                    />
                </ul>
                <div class="p__pic-side">
                    <div class="p__pic-wrap">
                        <!--ВАЖНО - соблюдать пропорции, для картинки ниже-->
                        <div
                                v-observe-visibility="{
                callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'image'),
                once: true
              }"
                                :class="{ 'animated-mode': blocksVisibility.image }"
                                class="lazy-image lazy-image--left"
                        >
                            <img
                                    :src="rightPhoto"
                                    alt=""
                                    class="p__pic"
                            >
                        </div>
                        <!-- Разметка ниже является стилевым дополнением, не нуждается в интеграции -->
                        <ul
                                v-observe-visibility="{
                callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'decorations'),
                once: true,
                throttle: 700
              }"
                                :class="{ 'animated-mode': blocksVisibility.decorations }"
                                class="p__pic-cells"
                        >
                            <li class="p__pic-cell p__pic-cell--r-l">
                                decoration cell
                            </li>
                            <li class="p__pic-cell p__pic-cell--r-l">
                                <span class="p__pic-slash">decoration cell</span>
                            </li>
                            <li class="p__pic-cell p__pic-cell--r-l">
                                decoration cell
                            </li>
                            <li class="p__pic-cell p__pic-cell--t">
                                decoration cell
                            </li>
                            <li class="p__pic-cell p__pic-cell--t">
                                decoration cell
                            </li>
                            <li class="p__pic-cell p__pic-cell--t">
                                decoration cell
                            </li>
                            <li class="p__pic-cell p__pic-cell--t">
                                decoration cell
                            </li>
                            <li class="p__pic-cell p__pic-cell--t">
                                decoration cell
                            </li>
                        </ul>
                        <p
                                v-observe-visibility="{
                callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'picTxt'),
                once: true,
                throttle: 1000
              }"
                                :class="{ 'animated-mode': blocksVisibility.picTxt }"
                                class="p__pic-text"
                        >
                            МЫ ВСТРЕТИМ, ПРОВОДИМ ВАШИХ КЛИЕНТОВ И ПАРТНЕРОВ, ПРЕДЛОЖИМ АРОМАТНЫЙ ЧАЙ ИЛИ КОФЕ, А
                            ТАКЖЕ ПРИМЕМ ДОКУМЕНТЫ И ПОСЫЛКИ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '~/plugins/mixins'

export default {
  name: 'ServicesForResidents',
  mixins: [mixins.visibility],
  props: {
    rightPhoto: {
      type: String,
      default: '/img/ex/office-ex.jpg'
    }
  },
  data () {
    return {
      items: [
        {
          txt: 'Услуги reception'
        },
        {
          txt: 'Юридические адреса'
        },
        {
          txt: 'Печать (200 листов/месяц)'
        },
        {
          txt: 'Аренда переговорных комнат (без ограничений по часам/месяц)'
        },
        {
          txt: 'Выделенная сеть Wi-Fi для команды (до 40 Мбит/сек.)'
        },
        {
          txt: 'Возможность подключения IP-телефонии'
        },
        {
          txt: 'Доступ к кухне (наличие холодильника, СВЧ&#8209;печей, посуды)'
        },
        {
          txt: 'Прием корреспонденции (с 9.00 до 19:00)'
        },
        {
          txt: 'Административно-хозяйственная часть (доступ 24/7, охрана 24/7, ежедневная уборка помещений)'
        },
        {
          txt: 'Участие в программах по работе со стартапами'
        },
        {
          txt: 'Доступ к образовательным мероприятиям площадки'
        },
        {
          txt: 'Demodays и WINE Nights для резидентов каждый месяц'
        },
        {
          txt: 'Аренда локеров (ячеек для хранения личных вещей) – 1 ед.'
        }
      ],
      blocksVisibility: {
        imageMob: false,
        list: false,
        image: false,
        decorations: false,
        picTxt: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "services-for-residents";
</style>
