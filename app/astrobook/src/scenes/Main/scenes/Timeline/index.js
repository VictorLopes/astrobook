import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  StatusBar,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity

} from 'react-native'


import NextFields from './components/NextFields'

import { Icon } from 'react-native-elements'

import IMAGES from '@constants/images'

// Components
import Header from '@components/MainHeader'
import Post from './components/Post';
import ShareMomment from './components/ShareMomment';


const moment = require('moment')
// Constants
import COLORS from '@constants/colors'


class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      initiated: false,
      user: {
        full_name: 'Igor Lima Gonçalves',
        name: 'Igor Lima Gonçalves',
        user_photo: '',
      },
      posts: [
        {

          user_name: 'Roberto Ferreira',
          user_photo: 'https://goadmedia.com.br/wp-content/uploads/2015/11/c%C3%B3pia-de-GustavoReis3x4-354x450.jpg',
          created_at_formated: '20/10/2019',
          comment: 'As vezes também penso que eu não sou, pareço pertencer a uma galáxia longínqua de tão estranho que sou de mim. Sou eu? Espanto-me com o meu encontro.\n\nFoto registrada no dia 17/10/2019\nEquipamento:Telescópio 152mm Astronômico Skylife Antares + Câmera Lunar',
          comments: [
            {
              name: 'Igor Lima Gonçalves',
              created_at: '20/10/2019',
              message: 'Amei essa foto! Da um bom papel de parede.',
              profile_photo: 'https://instagram.fssa2-1.fna.fbcdn.net/vp/abfa8d4a6862428348245a6e4a9dfe23/5E2AA1E4/t51.2885-15/e35/s1080x1080/69542281_174115607048660_1071886302316277652_n.jpg?_nc_ht=instagram.fssa2-1.fna.fbcdn.net&_nc_cat=108'
            }
          ],
          photos: [
            {
              url: 'https://i.pinimg.com/originals/9f/56/d8/9f56d8a00ec3df07e641a6800c4f144a.jpg',
              props: {

              }
            },
          ]
        },
        {
          user_name: 'Gustavo Reis',
          user_photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBUPDxAVFRUWFxUWFRcYFRcVGBUXFRcXFxcWGBgYHSggGBolGxUWITEhJSkrLi4uFx81ODMtNygtLisBCgoKDg0OGhAQGy0lHyUrLS0tLS83LS0tLSstLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIANEA8QMBIgACEQEDEQH/xAAcAAACAQUBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABBEAABAwEFBQYDBgMHBQEAAAABAAIRAwQFEiExBkFRYXEHEyKBkaEyscEUI0JScvCCg9EzNWJzorKzFVN0kuE0/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAIhEBAQACAgICAgMAAAAAAAAAAAECEQMxEiETQTJRBCJh/9oADAMBAAIRAxEAPwDrCaAmrATQhQGhCYQNNIJgIGhOEIBCsLzvSlZmGpWeGNaJJP7zXLb/AO1Kq+phstOGA5FwILuZj4c90g/JB2IIcYXBKvaBeTzIcIjRpa0eoOL3CoVNsLRXcHVK7WYMw0uOFx55nEdwnmoHoFrwdCFMLz87bO3kyyu8AaNa1mEc5E+pCzdzdp9ppO7uvhq+rHH+LDHqE2ars4CcLXdndsLLbQA12B5nwOgOy4bjruWxBSCEQmmgUIhNCgRShShCCMIhSQghCIUkIIQkVOEiEEEKSaC0CYQE1ZATSTQCYSTUJSCYSCCgcrWdr9rKV3tBeQXEOgDPMRAMaajXmru/b+s9kaXV6gbkTnmcuQz9lwu+L4Nsr1K4a1pcZYDo0NgAkQeAJPugutotp6tsqmpUmDGBgjwcN/xRqdFhKsSC4AEyCMIdAOU4iIcddwCumugS90zwyBHABu7z0KtXObk+cXHLIN0ynl8yotTIoNY4gPHhZkIdhLnDeQTGZidc9xVnarR3tQEs0AbAbBgb/iOZ6q+DxhkHfqY/cfPnuh9lDmjC7UmZI8R/E4nyHICFXadKRewN7tmIyZJOUchGqVO0ljfEWwNQ3KfI5eaoVLOTUIDtPpvDRuyVCzU3kF05Z5kxvjdO/kgzdnt8OFSjULTlAiY67uC6rsH2m0qmGzW44Kkw2o74XzoDI8B668VxKg1zHeJrhJkE4s89xIE9VXqsLgSdDIdrqM8+eqdHb1y2FJcr7G9rKtVv2C0uLi1s0HnUtbM0zO8ASM9J4LqisqEk0IEhNCBITQgiiFJJBFIqaigihSQgswmgJqyAhCEAmFFMIJBOEgmg5T25vw0aP5cZEDeYzPsB5rkFC8QDJAO8g58/C3+q6X2524Pr0qAIljC4jhjyE+mn7Ot9muzP2y0EvbLGxr55/viqZXS+OO/TAf8AVKr9R4TyMenkq7re7Dh7lzuZbAH6RxiF6EsezVClGGk0fwhVa2z9nf8AFSaf4Qsby5fpvOLH9vOLmF4+F1PnHsB9fdWjaj6U7/zOAdHQujXJeiLRshZ3GcAWFvXYRj5wgeYBUfN+4n4P1XEKt595DSxrRvIGZ5mSZ6LMXdYWubNN2NxyhuDrmTIHzW0Wzs4jVuE/mEn6LBXls5arGJY5pZv8IkcxkrTlxvpW8OUazfNV7aha/X9Qd7gKFGsSwiTn78lmRQa/FVqhmUSYzaTObsI05xCwNrrAvOHIcMj7jI9cloxZS4L3qWaox9N5a9jmuaZjMEEA8RORG+V6xsFqFakys3R7GvG/4gD9V4/obs9Rnlw4dV6D7E77rWmxOoVsxQcG03cWOkhh4lsa8COEmYiuioQhSgITSQCEIQJCaRQIpKSSBITQgs0IQrICSZSQCajKJQSUpVOVKUHAO0Z4rXpXI0aWt6YWtk5cz+9F0/suugULG15EOqYndBJj2+a5la6Pf2uvUIkvquHmakQOIghdzumkGUmNbkGgAdAIWeXbXHpkQBEKm5icpk5Kt9rT0okJFkpuUmlZtVCpZwdQsVeNz06rS1zRBWekKm5oVcsJVseSxx+/NlhSlmE4Z1GpadRzO8dBrotBvfYqtTdjoxUpuza5ukH5L0deVhZVaWuC1e5bA6jVq0XtBY7xA7iSc556T1VPPLBe4Y5+3A7bQqUXQ8biB13nqux9gdoDe/oYiSW06gG7KQfPxNVbbXZulVouLWAEZ5CMxwWG7DnYLxq03HPuHgbpipT/AKLfjz8nLy8fi7mmkmtmIQhCAQhCBIQhAkkyhAkITQWSEkKyAUihRKAlEpJSglKC7JQlNBw6wODX45zNTpmXu3fTku3WJ4wN6BcGtNcU6zuVQwDuLTkCNZiV2+6qmKlTduLWn1ErLPtvx9VlGlTKtLTb6VIfePa3fmQPPNUKd9UXfDUafMKqV8QoqnTtTH5gg9DKqNAOhVGhhyTnIiEnVWjUoKdQqze0TKpXnflmojx1WDq4f1WDq7Y2U/C8OjWDp1lZ5Y2r45SMlb2BzS0jUFc27Nnd1fuHTEKzOvhxfNgXQaVvpWhofSeHNOUjdyPBcz2fr4doKeWldzTAnXGN3kfJW4e6pz9R6EQhC6nIaEIQCEIQJCEIEhCEAhCEFghCSsgJISJQIqJKCVElAyVCtVDWucdACTHISglQrCWOHEFRnbMbYvhJcpK4dtnZG0LSHNOKnWIqU3D8TXjQjUGSf2F1mxW19O7qVRjC93dMAA44QJWD2iuWzusLXPcBUpvqtpT+LxOcGj971tNw2bDZaNM7mNHtksJn5YyujPj8MrJ05xeF02+3lxqAtz/NGXL2yWMbsVeDJLC0a61Tz5a6ei6NtPRtrm4LHTlx/E52Fo5k6+ma0y2dnNtrOY60W0VCHBz2u7w0iAQcAaHDIjI71X5Mqn44truoXrZqrXhwc2IeG1cU6yYMeWq2PZ/aG2mrhqNaWudAGYLB9eZVK7djhZaApsDTUBJx4ngEEzhwycMbiCDz3LLbM3XUFR3eGYOR1IkaE5SRxWNytuo2mEmO62C9bRUbTxU9ekxzPJaJfzrxtVBtOjUDCS41H4sLYyhvHiuj2izgNha/aaBc7C0D1ga56apnlcanCTKOY1Looh3d2u8rMx+WTmnTiS50zlrl5rK3f2e2R/jZbKdVuoFPCB5EEx5LJ35sILXXFVrm0fuywhrQQQ5rmunFOodrrvBBzUW7COoYHWeqKbmABzQJZWA3vE/FzERCteS67Zzi99IXRsjVsVoFSjVwtJ8Tc3YhOhzEqx2QuM1b5tVoJhtne7Dmc3vc/D5AEn0XQbDTdg8e7nKxeytkLLXbzGRrUnDnipSfdMc7ZS4SZRv1jcTTaSZMZnmqypWVmFgHL55qquvHpx5d3RoQhSqEkIQCSEIBCEIBCEIMekmkrBFRKkVAohEqBU3KBUiJKYKRQEGs7X2SadOm2I70xP8Aiwu+RWyXTUxUqbog4W5cMlbX1SD6Lp3CQfyuEweu5W2x9sD6QbllAA8gR81xzHxtjuzz8sca2PBiVF1ibz9Ve04Ser3GXtljlZ0sHWBrslWs1jbTyaFUc6FUY8O0UY4za2WWWlO0jVYXuRig+SzVqKw9ofgdnoVly6a8O9LunZwNQqpoNjQKpSzCkQreM0rcrtj6tKNFZXTVYaldg+LHTn/0H78wsraAFhNk/HXrukEd8evhpsHzVccfei5ettyQhC7HEEIQgEkIQCEIQCEIQCEIQY9IoSKsEVAqRKgSiESoFSJUCVICgKKkEFG8QTScAwvkaDUwtS2Ytbm1A0twxk4ZAgt8JBjfl7rd2rTK9Pu7bXbkJw1I0xA6nrOL2WOePdbYZ9Yt5s9sDwC0zu9NVVdVWk070fQDMsQcCSd8zHtEb9yv772ibQs/etGJ2GQJ46aLG5Npiv8AaK1vbQeafxR4eqyFkvCiSGh+cDLfHGNVzK69sDXd95mBmYz3Ej5aKrfN8moB3YEgyDElpnD4SNDmmO5d1bK42ajqTyDvWFt9qpThLhO4bz0XOrPtvXBwOJOeGQBr109laU9oKocJcSCXQdSM585Vct1bDxn269Z3kNHRVKlWFy617Z1AGbpI36TMboIjNbFZdoXVaAc4eLCDrkcs/cHJV3ZD1azV63hgaSBJAJgaxvPl/VW/ZnZj9mdXcZNSo8jkAQ0nzLfZa9brQMDnh2jXZ6wXGIz1iNP8S6Ds9Y+4stKlEENBcODneJ3uSteGbu6x5rqajIppIXQ5jSQhAISQgaEkIGkhCAQkhBjZSlRlKVZBkqJKCVAlAOKgUyVAlSHKkCqcqQKCs1avt5Z3U2svCn8VCRUH5qJILyeOGJ6YlszSqtVgLWhwBDyQQc5GE5KuXS2PbmlC8GPpBk/FmDOgznoVd3nRbaKQptJzcACeJJ6RkCtY2muKtdVpikHOsz3fcn/tFzhNI8AM8J4QFmbotryxrwRDnYmtAzJ0Gp657pXLnj9x0Y5e9VdXVsg6hW+5LQ4DPvBja9s6t0LXRuBA1yWUr7OPD8Xc03cML3DfrB09Ss5ZrW2tSa4jMeoKxdr2lbSdgqA9d3uqzrVdGNkvS3ZdVM/HYGiN+QHz5A+QVrarjpn4aGAGRm46OgHIE8FkqO2Vmcc3GZiMO8blSr7R06r2tpNJLtCfCIGscdVWtZljb0srNstQqtw12YgIgGRAHCN5VhUo/Z/DOZdxAAAJbH19Ft77SyjSJcYO8zErl9vvJ9R4Y1pxY3NY0Zky92QiZzgKMJax5cpGybMMNttVKk3+zZL6uujXEiZ3OdHMyeC64tb2E2b/AOnWbC8g1qhD6pG4xkwH8rc/Mk71si7McfGOHLLdCEIVlQhCSBoSQgEIQgEIQgEIQgw2JIlU8SMSshIlRLlEuUSUEiVAlIlRJUiYKYKpyo1azWNL3GGtBJPADMlBkbHTxujdqeiuL0IaaTjkMYb5vBa33IHmtU7Mr1fbX220umBVZRpt3MYxmP1JqSeg4BbraqQewtPlyIzB6gwfJVyn0nG+9tc2mu9looup1Gy0jP5gjgQc1xa1ird1U0yZZ+B8SYiCDOQO/wBeK71WONvPQjgRqFoe1txioCCJBnKPcHcuXz8b7dXh5T/VDZe+nOIGPwknIDKZybmMzlmdZPQLb6jLPXbmGOI57+q40+jXsRIYC5m46uZoIz1HXmthufayk0NYKkk6jhzI8kyxncWwz16rcrNs9RpvDxTaBJOEaSRBPv8AJZJ5osbm0NHRaJa9tGl2FhEzvO7dlzwysde+17e7c11QHFIaJ0JGR9Z47lTxtafJIynaHfbe6w0qgwlpGWsiRB8/l65Dsh2bJm8rS3x5toggy0GcVQ8yDlyJ45arcGzta11m17SC2i04msdIdUJAguH4QIHpou03AIpkcyfkPotePUvjHNybs8qyiEkLoYGhKUKA0JIQNCimgaEkIGhJCAQhJBr2JLEqONIvVkKuJIuVLEkXIKmJKVDEljUirK0fbbaEOBstF0ifvHDTL8A89fTiq+0+19Omx1GznFUcC3GD4WTqQd56LQGvWmOP2plXQuw22AOttmOuOlWHMOaWO9CxvqurSvPWxF6/Yr2oVSYZVmz1DyqkYD5VAzylegpWeU1VpfSxt9Eg94zfk8ceB6qwr0m1BmFm3aKwq2eDI9FzcvH9x08XJ9VrVe6RMwsXbdjrFWOKpQaTx0+S3R9OVYV6cLm9zp0er202j2f2EuJ7lvqf68FmLBstY7N4qdCm1w/EGifXVXxxMMhSqVC/cq+Vva/jPpRoiXTuGileN/PsNhNsY0Pw1cJa7IFpqd1qNM81PDgpyBJOQHEnID1VHbS7gLorUNcFLFI3uYRULvNwJ810fx5/bbn/AJF9aVtnu0ax2oinVP2epwqEYHH/AA1NPIwtxDpzC8qOfI5j3We2b20tligUapLd9N/iZ6fh6iF2XFx7ejkLl9i7XWuA7yyQd+Gp8pb9VmrH2m2B/wDaCrT6txD/AEE/JV1U7bshWF23vZ7UMVnrMqfpcCR1Go81fKEmhJCCSEpSlBKUpSSQOUJIQaeHp41a94jvFZC6xpY1bd4sDfu1VKzSxkPqcJ8Lf1H6D2UyDO3jedKzsx1Xho3cSeAG8rnm0W1tW0Sxksp/lB8Tv1H6adVgr0vWrXd3lR5cT6AcANwWNrVcwtJNKW7VzXzE/vf9FWpVViy/NvX6FXFN6naq4tjMbSN+47weIXoXYm+/t9goWkkYy3DV5VWeB/SSCRyIXnnGt77Gb8FG01bC4w2t95T/AM1jYeBzcwA/y1XOLYuzvcqKbnKIKyaKdSlOYVlVar8qlXpYhO9YcnHv3GuHJr1WMfSVMtVV44lYO974pUaTqjqop02mHVSCcz+GmAJqP5DTeubV3p17mts/YaYe/F+Fkx+oZE+WnrwTvql3lCrTP4qdQerSFrWxu3Vnth+zii6hupYnNdjAGQMfC+ATGe/NbbGKZ35eq6+OST04+W2328ytfIB4hMDgk6mWSw6sJaerTB+SWJdTnSDlUZWPFUnvyUGlQlfULa9jg9ji1w0IJBHQhbns/wBp1ss7wLQ416WQcDAe3m12/odeIWggqLjuSweqLrvGlaqLK9B4cx4lp+YI3EHIhXS4V2T7XfZK4slZ33NZwAJOVOqcgeQdkDzg8V3SVnZpaU0KMolQlKUpSlKUEpQoyhBz3vVb268qdBmOq8NHueQG8rAX5tNTs8sb46nDc39R+mvRaHb7zqV3F9R5cfYDgBuC0xx2rbpsN+7YVa0spTTZyPiPUjToFrRrEq0fUlLGtJ6UVqlVUXvlUXVFHEo2KhfBBO4iVWZWBORHqrWUsnZD14f/AFQlkjV4J2W1vo1GVqRwvpuD2Hg5pkdRI03iVZNflCqMKIemtnr4ZbrNStVPIPbJH5HAw9h6OBHkslK4z2N3/wB1aH2B58NaX0+VVg8Q/iYJ/l812Slk4vcfCAI5HOT8vRZWarSVLDAk/vmuUbebfVXnubtl9NpBfWpPDi8tPwBo8QZvxDXp8XTatpFUEAeEyMxrGWfJc/7U7hovsTq7KbWPpHFiY0NMb5jURKzz9z0047Jfca5Q21t1qpANbSLZE4mva84dWvwmInflKxO0Ar2h3f2hxfhAwUxLaVIRENbPy9U9m7RjoDFq3Iq/tebC0nqvPy5cplp6ePFj47axcVnqV7fZ6TH9241Bgc38BEuBE9N69C3XbQ+Q6A9kNqD8riAfQzkeo1BXDNiaeK97MB/3HH0pvP0XdLZYgfvKcCoAYO4/4Xxq1d3H08/m/JwztCsQoXnaWNENc8VB/Na15/1OctbxLaO0u2d7edUYSCxtNjgY1DAZEbvEPRakTmumdOZWlRBUQVEOUoV5UXOUcag5yJSpv8RbxEjqF6T7P78+3XfRrF0vDe7q8e8ZkSeuTvNeZsXjaeceoW+9km1X2K0/Zqp+6tD2tJ/JU0Y7ocmnqOCi9Jjv0olRlKVmsnKUqMolBKUKEpqR5Xtfxu/U75lWxQhbsVIIehChKgmhCqlGt8JUm6DomhBNqqNQhSM3sZ/eVj/8ij/vC9JV/gHUfJCFTJbHpjbJv/e8qw2w/wDw2j/Lf8kIWazi2yX9keo+qy1o0d0QheXyfnXs4fhFj2ef3xZutX/hqLvb9Ckhejx9PL5vycB7Sf74tX8r/hYtXqaoQuidOf7AUDqhCkSCKiEKUKR+JvUKtZv7Qfrb/uQhVS9ZhNCFmuSEIUgQhCD/2Q==',
          created_at_formated: '19/10/2019',
          comment: 'Foto da lua \n\nTirada entre 18:40 e 19:30\n\nEquipamento:Refletor Newtoniano Astro Fi 130',
          photos: [
            {
              url: 'https://www.clubedeastronomia.com.br/oliveira04.jpg',
              props: {

              }
            },

          ]
        },
        {
          user_name: 'Geovane Santos',
          user_photo: 'http://www.librelato.com.br/upload/Image/Geovane%20Santos%20de%20Borba%203x4/geovane.jpg',
          created_at_formated: '08/10/2019',
          comment: 'Foto de Saturno\n\nTirada entre 18:40 e 19:30 do dia 08/10/2019\n\nEquipamento:Newtoniano de 25 cm abertura, barlow 2x',
          photos: [
            {
              url: 'https://www.clubedeastronomia.com.br/saturnovo.jpg',
              props: {
              }
            },
            {
              url: 'https://www.clubedeastronomia.com.br/saturno2.jpg',
              props: {

              }
            },
          ]
        },
        {
          user_name: 'Igor Lima Gonçalves',
          user_photo: 'https://instagram.fssa2-1.fna.fbcdn.net/vp/abfa8d4a6862428348245a6e4a9dfe23/5E2AA1E4/t51.2885-15/e35/s1080x1080/69542281_174115607048660_1071886302316277652_n.jpg?_nc_ht=instagram.fssa2-1.fna.fbcdn.net&_nc_cat=108',
          created_at_formated: '20/10/2019',
          comment: 'Foto do planeta Jupiter \n\nTirada entre 20:00 e 21:00 do dia 21/09/2019\n\nEquipamento:Telescópio 150mm Astronômico Skylife Polar 6 + Câmera Lunar',
          photos: [
            {
              url: 'https://www.clubedeastronomia.com.br/video65.jpg',
              props: {

              }
            },
          ]
        },
      ]
    }

  }

  static getDerivedStateFromProps(props, state) {
    // if (props.user)
    //   state.user = props.user

    // Retry get posts
    // if ((props.user && props.user.user_uid) && !state.initiated) {
    //   props.getPosts(props.user_uid)
    //   state.initiated = true
    // }

    // if (props.posts)
    //   state.posts = props.posts

    return state;
  }

  componentDidMount() {
    setTimeout(() => {
      this.subs = [
        this.props.navigation.addListener('didFocus', () => this.didFocusFunctions()),
      ];
    }, 3000)

    this.didFocusFunctions();
  }

  didFocusFunctions() {
    setTimeout(() => {
      // this.props.getPosts(this.props.user.user_uid)
    }, 500);
  }

  render() {
    return (
      <>
        <Header
          title='Timeline'
        />
        <ScrollView
          style={{
            backgroundColor: 'rgba(242, 243, 244, 1)',
          }}
          horizontal={false}
        >
          <StatusBar
            translucent={true}
            barStyle='light-content'
            backgroundColor={COLORS.PRIMARY_HEADER_BACKGROUND}
            hidden={false}
          />
          {
            (this.props.timelinePostLoading) && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 20
                }}
              >
                <ActivityIndicator
                  size='large'
                  color='#000'
                />

              </View>
            )
          }
          <View
            style={{
              marginVertical: 20
            }}
          />
          {

            this.state.posts.map((item, i) => (
              <Post
                key={`post-${i}`}
                name={item.user_name}
                profilePhoto={(item.user_photo) ? item.user_photo : 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'}
                time={item.created_at_formated}
                message={item.comment}
                item={item}
                photos={item.photos}
                onCommentPress={() => {
                  this.props.setCurrentPost(item)
                  this.props.navigation.navigate('Comments', { item })
                }}

                commentsNumber={(item.comments) ? item.comments.length : 0}
              />

            ))
          }


        </ScrollView>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    clubsProfileLoading: state.user.clubsProfileLoading,
    timelinePostLoading: state.user.timelinePostLoading,
    posts: state.user.posts,

  }
}

const mapDispatchToProps = dispatch => ({
  getUserData() {
    dispatch({ type: 'USER_STORAGE_GET_DATA_TRIGGER' })
  },
  getPosts(payload) {
    dispatch({
      type: 'USER_GET_POSTS_TRIGGER',
      payload
    })
  },
  setCurrentPost(payload) {
    dispatch({
      type: 'USER_SET_CURRENT_POST_TRIGGER',
      payload
    })
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Timeline));
