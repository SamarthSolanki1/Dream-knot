// CustomWedding.jsx
import React, { useState } from 'react';
import '../styles/CustomWedding.css';

const CustomWedding = () => {
  const [cart, setCart] = useState([]);
  const [selectedSection, setSelectedSection] = useState('venues');

  const weddingOptions = {
    venues: {
      title: 'Wedding Venues',
      items: [
        {
          id: 'v1',
          name: 'Bangalore Palace Gardens',
          price: 500000,
          location: 'Bangalore',
          capacity: '500-1000 guests',
          image : 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/01/e4/9c/more-far.jpg?w=1200&h=-1&s=1'
        },
        {
          id: 'v2',
          name: 'Goa Beachfront Resort',
          price: 600000,
          
          location: 'Goa',
          capacity: '200-400 guests',
          image :'https://www.holidify.com/images/cmsuploads/compressed/207321005_20210122153931.jpg'
        },
        {
          id: 'v3',
          name: 'Mumbai Luxury Hotel',
          price: 800000,
          
          location: 'Mumbai',
          capacity: '300-600 guests',
          image :'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXFhgYFxgYGRYaFxgaFxgWFxgYFxcbHSggGBolHRcXITEhJSkrLi4vFx8zODMtNygtLisBCgoKDg0OGxAQGzAlICU1LS8wKy0tLS0rLystLS0tKy8rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMcA/QMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgABB//EAEAQAAIBAgQEAwUHAwMEAQUBAAECEQADBBIhMQUiQVETYXEGMoGRoRQjQlKxwdFicvAVguFTkqLxQyQzRGOjFv/EABoBAAMBAQEBAAAAAAAAAAAAAAECAwQABQb/xAAxEQACAgEDAQYFBAEFAAAAAAAAAQIRAxIhMUEEEyJRYfAycZGx0YGhweHxBRQVM0L/2gAMAwEAAhEDEQA/APmfEeHXMK4tXQpDIG0OZcrTBmBB0pvijhLuHYiylu+ChVrcgMCwDjTQEAk69qF45xFsWEbIucWktcs85BMEg+6TmAOsadNqU3MJiMO33lp0nTmU5T/u2NZVFtLW9/R+9jQ5VelbfIlZxLAlQZysdD1jT5U84di9JA0O47Gi8Fewl3DOtyyBdFtvDu7NmUSoJXXy1kHrvWcTEurMitqpmCBJEf8ANVw5pRlaVUTy4oyVN3ZrlarFNLOH4nQEiAdx2NNQtfRdn7RHNG+p42XBLHKuhJTVgNQAqwCrCIkpqxTUFFWAUByQNSBrwCpAUBlZ6DUga8AqQFAY8rqlFdFA4jA7Cugdh8qlFdFccRrw1PLUYrjiBNRNWFaiVptgOyk+gqBq0rUGWiIypo7CoGOw+VWEVAiiK7Kj6ChMZiMug979Kvxd8KIHvH6eZrP4nFrBEkkmJHUnz+lYO2dsWNaIc/Y09n7M5vVLgrxWIWCJMkx60ZgfY67fw4xGdLdotl11ckMVMjQKJB61JvZa6bCYlriLbOqqJZzBMZtguo86Fx/FGFpbIaVTMQPwgsSxPmdd6+elkc/ge97nsRxqHxLYB+0NaRkDHmy5wDock5c3eMxMUtJLE7n0E/pWw9jMJY++u4gIyrbUrng8zE+4p95tPoaG4pxcC591KLG2VfzMRprHvU3evW4pfr0O7qOjU3+nUE43ww4O8otuWU20uSRB5idNOojfSmI9o2v2GsM2eSh5oDAowbT8w3Hx+FBtjDi3s+M+YAWrTEwpFtXkyR1AZub0ppx/2Ht2cL9qs33aHVQpykHMRqHWNRI6UjcFpjk56P1D4t3DjyK8f7HX7OHXGo9trZVXOUnOucjlKkQYJg69NquwfHrdzBvhrllGf8DmC9uI92RIECNDpPWlWA9ornhNYe42RhlMnMuhB0H4NR085p23stbbBPjLdxvEQiU5SJJA0iCo1mTNLLb/ALN99grf4TM3sPeskF1dASTbZwfDdTqIbY6RpNaDh2NXaQRp55ZE/KgV4w1+1bwt14W2xA5RpMhsse8dSYNV8S4acFfCF1uiAFdeUNmUkSuv61qw55Y5J9f4IZMamq6GnyVILS7hGPzKA2g21/Ce3pTfJX0WDPHLG0eVlwvG6ZFRUwK4CpqKq2IkcoqYFcBUooDHgFSAr2K9igGjyK6KlFdFcGiMV0VOK8igdRGK8ipxXhFEFECKiRVkV5FcdRSRVbCiCKrIopitFDLQuMvBB/Udh+58qJxd8IPM7D/OlZnE3muOq2zmdmgBdWJmAoHrWLtnbFiWmPP2NGDs2t2+AbH4+MxInuTpJo617P2jhlxN28Q+Y5LQygcrESZ1YaSSIqeAw6WRe+2WpuhYVXCsEaSZOsA5cu070AMHib6G5btnwFJDNKj3dW3MnQ9BXz0p6t7r18z1YxS6X6A+O4q1zLaUlgoyjyWSTAGwkkz8603CVwlnBozoj3y79AzgK3LM6IPqaqs8QsWMELSq3itnzscoUBmMKo3Y5Y1038qAw/BMTibRu27cWhIzFgqyJkb5idO1SyNSVT2V+fJTHadx3fyF2drhK2UZ265VJI+Ww9aoPAMS7EeHBABIZgDrMdfI0/8AZTHW8L45uZs5RVUJsWBMyxGij5+VLOJ8eY3C2YpIA5GImJ3113qilk1tRW3mLWPTcm78gz294Nawt5PBlVOHs3CMxIzOObc7eVJsJx05WtMxVGIzBSchK+6WXuO9EcL4wGuWmuOzeGU0Jk5UIIVST9JrV+1mKwl/CpkVPGF1c0oq3MpR/wAW7CYnXtTOTg1Bq/URRUlqT/QpxBwd/Bvy21vLbXK0QxKlQQrgc3LOlZ/wMRhkDvbbwG0DCNQ2oEg9Y2Pajr3srirNhsQHRrSgErmMwWyjkIjc9DXHjxu4YYZgohgRObNyzyyTlI17dKlj2/63avf0+RWbv41ToK4gcPicLaW0iriM6gtkC5hlIEuNfeyyD9aCwOJ8C41rGWUYFSOYIRqDlIOoBBgzv0qzivs4LFqziMPcdjdYgocp/DmgAAHfSCK9wj2r1xlxSsGynRswYMFOUwoB3gfGjFx0+Hdb7dTmnfi58+hDEcLuYdLV9mU2rjHLlYkiMqslxWiDLDYnem3COIBgAZA2E9D2PlQeFS5hBYe+i3cO5YqrQwiArBlMge8OmmnaqcRw/wAJLV+3c8VXFwlFzfdhMgOfcFTIObQfKtODtEsc9SfvyIZMSkqZqMtegUv4TxAOoDETA6jTyP8ANMhX0WHNHLHVE8rJjcHTOAqUVwqQFVFOAr0CuAqYFA48iuipAV0ULOPIryKnXhrrOIEV4anFRIrjiNRNTivCKJxA0Pir4QSd+g7/APFWYq8EWT8B3NZe5fuYm6LVrmuMSoU6DQdCSAFGuv8Ahx9r7WsMaXP2L4cLm9+CGKxFy6+W2viMwPKoLE+QA2Aq2yLeFWziFcnESSRylEyMQuVSNzoZJNTsXxhsngB3xL27iuFBY8xZRkUDSE6j83lVmDwgsDDYy6+djcL+HsAtp40OsSVjbr1r52c3J2/888+h6sYpKkC8P4WMZcvXMVda0qIbkDKGYltQAREneANZqF3jjJY+zJGXOToNSWI0Zp8hoI+NXYg3+IXr72gq/jYsY5TygDSTERt0phwq9hLOBuq6qcQzEISklRpqXPujfbWkcvPd7beQyXXj1AbHsvnwq4u5dMnNChdJRiIzE6yRsB1oqz7UNYwYwyog5mYuZLHNMBRsu/nNJn4hfe2LdsXHtpMRmKLJLEwBA1JMmtf7E+yNnE4W7evqzspaObKunpBPzpJvSm8m6vgK3rTt6mS4Bwm7jrjojKgVC7M3aQNB1Otet7IrmIa8SQAZCgblh1J/L9aaez/GjgbmIa3bRs+ZEzaqq52jTc6R1FIOKcYzvLMD6CANZ6etUXeOfhdIVOCj4lbGHtZw61dxNtcN4ah7OGUFYC5yi5icuxk60vx/B8XhApuZXRzlENm1AmNQCNK7h7FCjLoVykeo12pxxfjNy/bW2yJCvnlZmcpWNTt8elVbyKSSqupOMYaW3z0I4b2wd8M2GbKVcAcwhgVZWENsToR31ppxfh2CbhouW/DGI8RAwVoeDo2ZJgmdZjzoPjww13CjKqC4GQSFUORBzSdzuPL5Uvxns/esYW3ilupctu4TwyCGWQTM9RpUI6HT+F3x5lpqUb6+p5iMJi8CbL3kUo/PaZSG9wjcb6SNx13p45w/EcReu3T4RNssmRgOdFJglx1jb5Gl6e1XjvhlxMFbMAKyiSmgI10aQBvvRntBw6zfv4m9gj4aoqNbRbeUNy84CmMsQTtRk3/72fmvmLHyjv6A9q5esJh/taZrLhntZsrIwYKGOXXKfd31kDSqbFq5h1W5ZfxFe3d8VFGqKAqsd9QQwb4eVFYLi7ocMMdaLWQri3mVSjK0TlLDWDlIB0HlNQ/01rVq2+GueJmw958RbzKMipAcCd5DTHXpPTuu/wDT5De1FTYXOvj2HVQzohtwJnISWj8sgyO5oi9axVgFrlqFBEsp0E7aAn6mq8W6XfvbX3Nwuivby/dhfDALZRBDZgTv166mj71q/bsXMtxblsFM4UncsAIDTGsfiFN3ri1Tr35g0KSbaB044AYJ9CVMEd5H70xtcSU6Ea76EH4xQ13HXTZi5Z+7yAAwGgdG5SxnTsKX4e1hSsOIJVspmTMcuhPfyrVj7fmj1v8AclPsuN+6NEuLTv8AQ1MYpO/0P8UtwHDsMyL4uIv+IZnKYUAbaBN6rwWARs3iXrkAwkGDH9ULqY761X/lcm+y+j/Ii7DB1v8AuhwMSvf6H+K9+0L3+h/il13h9oXQgv3TaIBJnmDdeaJivMZgLaZfDv3CDo2YkwJ6dj6V3/K5Lql9H+Q/7GFXb+qGX2he/wCv8V4cSn5v1oDGcPtoma3fcuCIDSV85BrrvDbWRSMSxdkltWAVtdN9q5f6tkq6X0Zz7BFOr/dB32lPzVVdxqDrPoKX4TBI9vNcxBD54yiVGWBDaHvNBWcJbbMcRcJgwoAIBGurb9t9N6Z/6pkp7fsxV2GG2/2GV/jCrpoD5nX5DWgr/GjICyxPRY+smRUMFdsLn5fEPLAk3Mo1nTXfSPSvWxbC4QlkhmH5YgCNeYiOnTrWafbs0m7f8Fo9lxqv8i7HriLxy5IBVicxM5VGZjJjoDoN9BRuCtZ7gwWDIa41xj4zaHW0Qys4EhYFzl10Oo3qriC37rBHYIBbY5pBMBSwQQAAWIAnXcVfbm5cFjBKbdlr2UXDmyq5tZWGYEliVD6Tsx3FZ5ZHJW3+P7H0U6QNhMUmDNu5azNiStzN7zEsxZVKjyXWdtRvqK7DcLOXD4m8y+E90jwwCYCMQxb8w0+oqeGuWsL4V0S1+L3iSWMkl0twOkCDAidNe0MHw+7f+z+I2TDvd8Mc2qy5z6HRR7xqbdenr1fO34HSLeKcZAv4gYFCtu4AuREHuKANgJWTrp33mpcM9kzfwtzFXLpHhsRkC6conViYA8oo7CYzD4C5ilQFwVCW2zCNDmYk/iE9vOk9o4y7h3NhbhsBznMxbDGCZUnU7GNelLbrw7LbdnUlzv6DvhvHcPY4d4MObpLk6QiyzRJOplYOlZy0997RW0l25aBJMBjbBjWY0n1p57N+xFvE4JsXee8XUvCqVFvlZgD7s9BsaaeyXHcNY4fcs3C3iM7sFUE7qoHSN+5oNxjq0K3e/wC4FbrVx/gy3srwQ4m9cS8Gi3aZioMEFXRYJGvU1ZxLguHRoFsRJ3LE9O5qeD4jctXbly02U3MwOgPKzZo1B10FC3yXOZiST1NPU3O7peQylFRqrZnsLxNYAMjT1FNbF9W90g1mrVgkaCYE9Kgo863uKZitrk1xphc4rdbDjDFgbQYMAQJBHTNvGvWaxdniN1dM0+Ta/Xej7HHB+NSPMa/SpyxtjqaNK6W75w9t5hZVp0XXLqGnTaOmwq3G8DuJfxC4S4rWrSZoZmMrkDsFYDffQ6bUnw+Ptvsw9DofkaPsXioYKSuYQ0RqPT4mszxyj8L/AEfHNmjWpbsMwPG1Y2Exlki2tu4tsNbEENl5lLALcgga761D/Smt21bC3s04W7cxFtm2AOR7akLpIMw2h77UZ/qiXFs279oNbs2bttYAYlnAhobQEFV+VL8fg0s2rTYa9LeBN62SWGdnVCmkFOVieu1Ktntt9uoH6k+LYhb17NdRrWKDJ4gEqfD8JFylJ1mM0+dE4uxa8K41q8wYMsI+XKwnUxCsYEnfSg8fxA4ifHtDxBdzF4lWK20twCBGWEBkgTNecQRHssEU27mZcuTVcuobMI9Dt0pqdx5/gMa0v2yWBxbut2HByqNCSpZRAgA5hvHbcUxwuIu+ER4WZMjZvdMAggmM0mPIdKyowVxSCtxidN0XKdRO2o0J+VajhdlyrFbwVgjZgRAMgyBLRrHbrQyqK3258mNBvevLzB+GYFTaDLhc6mYbwm17jVK94XYt5s32bxMuhBtORp09zT0o3hl7EiykXVtjmhM228/h/WveEpeZGi5bQZ9i2pOmvuzr+1K5/F/fv6DxT8P9e/qB3MLbN3L9nIOpyC2/6ZfrFeYuzaXLNkoP7HGbX+3XtTS8l/7VlNy2WA/+4G5TA20WocVtXi1sMyPm0kN7skbwtDV4kv5Ya8Lf8C/FJaKlhYKjMObJcAHlOUCrhh08LN9maApl8lyI7nljTXWiOJYG5bQnMjQRyhjr5+7rRX+n4gWwovJDpOTP9Dy0NSpU/wB2Fpp/0K+GXrAtsDhzcJEZsrkrrO4U+m9BcNxVpDcC2vEckawTkEnTmXT5imvB2xPhv4bW0X8Ss4BbbYFDPShOHcOa4l5y62lUqGJY82uhERpLGmlpqV+nVib+H8HYTEXXN0qgWSmYmAB72UAifPp0qV/CXDfZLlxFKrOaSZ93lA5e4+VUphx97nvLlXIVA3cydQJMxvtpJr21bsi62a4728piI97TcgA/moN7uvLovycuFfn5gnEMPbDHPdLW/DeYES2U5ATqcubLpNW4a5dxLJZsItmy14KGIAVW8KJCiCRkVj0HMd5qjHXcMr5ipZfCuKFJLc7Iyq2Uk6qSGn+mmeGw+IxN5bdwrYttfto5MFwxw8owU6R4aRJb8W1NvpTfl1/BOTSk/wCAfhF+zg7lrEN946+LmliNTnRPQQZ0qGFXEYgYa0AVsPe8O25ywGuXCGIWZMHNv231o/hzYfDNh70eLcAxAvamdWZLR15RpB5aCbiL+FbtCFFp2uKVkPmZiwJM9J0gCp7t7L9X+vv5MbYZYDgOHw9/F28UyXDbRcniADMZk5FneDQ/DfaIWcHcwwtA57pcMTEAhRED0+tJ798sSzsSTuWJJPqTS7EcQResny/yKeOHV8W/H7CudcDBMXdFsWhcfwwTyBiF5jJkDfXvUKTNxc/hX51H7e530q7gyaaHQcdxUvFTrcX9aSHEAHUyKj9sXt+360uiT4HTiU4W0SCQpICiYBIA7nsKptWJEeYozB3So5SRIgwTqOx7irrQAMx/H1rQ7TZK00hfgcKGuZTAGbLzMVUaxLN+EDqanw3hxu3Mk9SAQM0wCe4minw41899u80TwlvBuB17kgbRIjShOUqbjyGCjaUuLEq4cwx6D+Yq2xiLiRlY69Nxp5H1rRYzh62kcLLZ1yjNlkHMp6R0B6UFhLpW7bdlACbQAJEASY3OmpO9L3lpuh+7SaV+7B7PGW/GswZldPp1o5OKIe/yNVfZk8Gxtmm/mGkjW1lkDb8X1rYYlcHbw8BbHieCpHKpMkQTP5t/OoZcyjVRe/l9CkMTl1Rml4mg6n/tb+KKwuNV/dJP+1o+ZFPPZDC4b7nxhbaWMi5lOYDzb1Xz+FAY+zbGKuBMvh5hkChQsaGMqgDQkjadNak8qbap7DLG01vyWmw6gMVIBMA6antvRVq035TU3u22QKFt51IkiQ4B6EAx26dqc2sDbUqCgzZCW/uDsP0ArLPM6to1RxKxTYsMxICkkb+VXnAXAJKQO8j+aIyKLzmIUQSomNInTz3+NFrct+41s5u86a6gx8RU3ml0KLHQsGHMbafCq2IGh/Q0xXDWtZB0ME5mOvzqP2KwdywIO0sNj2za0FlY2lAED/AajIOg1+Bpj9iszAmfVvPzqeGwtoLJts4OoIbpv1ovLR2gVvbIEkEDuRVFy2d8p9aZ462uXlUjUnc7E6D4UccLYa2rC3E5erdd+p1ru+aVivHuZO40GDv260PdvqNzFOL2JwVm/cOJBNtVOVAxDFswAiDO00ixOPw9y5FqYkmNRygnfXtFaoSk62deZlnpTqyD4+3+cUPcx1vTnFau5h8FddbdvDW7e7Mc1wQANjmbzHaiPZn2Xw17A+Jcs57hZwHzONAdNA0aelGXaMcE20yeiW3qYx+IJJKsG8ugiaX/AOoG2IygySZYnqSY+tX8WwS2sReRRAV2UDXQBjG/pSrGusQdwQR5da1wjGS+YmR6I2z3EcQL9vMDp89aHNrnAPUjziqS8ajrqaIOJEozA6EEx1AFX01wZVlUnuD4rkaAdJP0P0rzGJG3f9zUsViEYzruYHqZ1NX2rYKjl0GwP6/WnVqgPdtIJ4rhyrXbfKSrlZUyphdwe1B2kgQQCatIA7CoFx3HzoRVKije9jP2d5LbEMFlhqRMwNQNfMU2OMP/AFbf/Y381XwKwqr6xMGY0604yLoP3rNkmtT29/QaEHXP3/ItGLP/AFbX/Yf5qnjGIPgnnQ8wHKCOjab79qdtaUf+6XcdANsAA+8PP/N6WMk5cfb8DuLS5+/5LeM2D9ja8Dqt1FAMxLBuxA6CsvjbzWwk5SWGYgSIGkddZrYXMlzAMpaf/qFYoCohVQw/cjMQu+s0r4/wKxFs2izP4YLy6EK0nNlCseWI3psW2zEySu2hRg1a5HRiGgQY021jvpR1nAMxVRlMgEmQBrMT+Xpv3qXBMBYIcXNSFOpeFEyBoBzbg79POiOIvZgG0SsOUOpZjB2zHXbWf6onSjJ70gLhNlzez19ZKtbcRIAYAHbQE7nXbqAY7UXwTCNnPiW4JBEdojmHr+9UcE4h4japKKrBZiAToGkSc+XTcDfvV/E1ul7YQwJIfVllTpoVIM6z8BWWak7hJq/fqaseleNJ0HvhrSKbhVVYiCxgE+W+u30qfGfaLDhs8l82qhf7iJk7Df1pGnDfvS1y54igAJmPMI/MY5j5ma7/AEe0Gz6kTOXTKY3EAde4pI4YbapWPLLkfwpIbYfjFm4E5speQVY80baH9Kf3MIoxGUl882ycrApHKqkGPdkAesisZfXBgWGRSjQSwZhmLZjGhOgEDoNzTbDYi2t21fYsxVrYJkE5FYHKNY6GkyYVzG0NDLJrxVsarivB7lrV7bsrEEFdQO0Hp3ik17AmS627xLs05Qump2zDz+lWcZ426Xj4YZk8UkRLAhW1GmkGY7aUJe9qAoINu6Hk7cw3nQhYiNOvwqUYZF8K/co5JpavsOMHwdzba4ttz4cyxiYOp5dzt0qm7gVZFfOyrbtyCGVQ2VQYk7sQNtJpfe468KAjAEFjLAkgkQDA0PkdfKgeLX1u20HujwV2YSsiYOu4j6V0YSck3+u4zlUWvoBvxwlrf3L5W5ZYjMdTlIGmvU0RxXjINlvBcm5MKHGp7gARB7f81T7KGz49q27KQAwMld8lwz5HpPpQXF2N24xw6Q1swZQiACACpJy9Dt0Fau6i51VVv6GN5pqDd39/0ox+GsF7oW8xQF8rOQSVJ2kd5/SjcbaeSbXMTlyMiODcmSxyxyMNiCBMEia0XD+EhmN2+i3CQxcEnTUZYjTv6aRR3CyjoU2i43LJEJ05hrJ7zOh2rVPPvaX4M2Ps987fcQ8EtMyXCqQE0ZrgOZrxBIBH5QRB9RS/E4vE+I1tiEKmGCqgAPqBr862j8FsgZEBS2YLoHuAMw6nWs5xrhN0so8NmhVQMqBtFB1Jz6TPXtQxzjKTdfWvyUnBxiv4FWIxYXckn/N6Au3cxJ/WjsXwK7bGZrbBZ1Y5Y1iJAJy6mN6WZR57itUdPQy5ZSk9ydpjm7xP6GrnxT6QB26/zXY2yLcHJ7wBGp07ieu4+nxHS+NJBMGfWjV7iR8OzPbl2GACqCYnQayemlH2OHZ2ucxBX3RpB2OXOdAeka7HtQoXmU5SNt9evWmHFL5Y/dszASWULlAAAYmBuBrJP5QfQNvoN1F921BI0BGnfXaiuHcOR82dnBEe4AdCOs0GouXSYDO2kwJ6f8beVG8OxgGYHOkQIRimomc2ok+tCSlVJjQ06rfA64Kwy8qN02A/anlrDOdrVw/7azPs/j7ioecjXTbsPKni8auja6/zqOTTqHj3lbUOcJwS++1pwO5ygD60Di7DqIKuPgP5oF+NXj+NviaExvFbwAlzqY3n9amoqw3kroCcXdvDUQdzuPX+aW37VzMC6nNlBBzMpjodE+tPrxurYF26U8PxCkbvmIzExAEa96IxGOsG6ghm+7XoPy9NYIq+OUPuSyrJ0V8GftYJ7v8A8LNG7Keb48oD/HU96tf2dvKYCOZ/qg/EEaH0kedaLhHtDZshdDDKZ0/qgdacPxdHU3oOXwmO0HXWIO5MaASaeU0pV0JpTcbUd/KhNwLht6wh8RCFJ5JZW11zDTUdN6aXLDXFypo5EAkr7x0GpBA1I3BoVuN27lsAm4CoJXTQE6agml1nEMXAF4yNew01G3SayZILvG0bMOZrD4tmXXuFY22ebX/dZj6W6Hy4kH8f/wDP9fCrU8QxUKj7hqBfFaTJitEYY5K0kZu+zRdSA8Dhrs/fXCqkSFQKza6iXYQo8gtPMNw3D50zm4SGBgohXv8Am/aluCthrqnMSBH7U6W6uXMd4/SoZXp2Rr7PBz8UnW/mbfj920tixbEKpAKhVGwjpsN6QJilhl8V410yr39aX28Shgs0mOv6Vy4q13FYmrdtG2GLTGlI0vs9fteHiBmmbZmVG0MDAnXesPjuF4dYZS4lRIVFAMdTDUf9pt9/8mg3xCsjidYIH7VTHafG35J5MSafi3f8CHGcPBIa093KYMHofXqK9tcPuyJe5p0IBGvcHQ/Gpm+yqg8/prT7H3AMpDasF/8Ada5vS0vOzDjjJxdcqufUD4R7KqwKfaL4DAZhE7HSTlPWgxw9MOWALhQSFN0hSY307TMeopl7Pe0gt37yPcICWyQQdzmUR9aQe2vF2xZtFwzhM4U5ZAkg9PTeuWCTk1bfHQnHtNU2l1XPkTxfE1Ue+oP9w/mhG47GudT5CO8TM7dazdzCrtHw/wCDrQr4CZy/HUT8Qda5dnj1Lf7ub4RrcTx1FGUOjEkLuWgGJJ6RFA4nHYcoWVLQIOxS3LamdInYT8RWXfCkGDPyrjbYelVjhiuGRn2ib5RobmNsEZjatFdQFyJm66z02+vlV/DuAC40W3tk5cx5Iyg/mIcaDvWWKt1n67VK3I2JE7xIkdj3mm0NcMm8je7Rs7/sffEwync8q5hG2n3h0pfjuEYiAHeIXKPuYOWZgn8XqaTYbiN5DK3DmiJJnSZiT6UU3tTjNJuEgCIIBGnX1plB9WTc5dEvqydrCuhkXVBiNEiPrRi8TvAAeMP+wUB//obhBDqpJgzCzIM9ANKY4X2ltAcyCZ7GjLFF7vcMM847VXyYqwBOTYHmO5jovlRWfblX4E/stKbdrTdvp/NTNsdz8h/NTaTZrp0NLbn/AKY+La/pUMY8heUDn7z21oAWh3b5D+aLs4NdGzCdDrA+k0rpDKLGXG8Sfs62h/1i3XXlj0pIlhzB26dZg+nrTgWRvmB+X80N9u15Bm89l+fX4UsNlSDN9ZbHlrAH8PKPzN73w/L8NfOpiF5VZnI6A7f3Hb5mhzeLE6l/6VkKPWNxTD/TjKqxEHLyL7oDHr3NW0N/EZnn6QVlFtncwNfJToPV/wCKY2bAtqSxkkbDRZ8+pPmaV5zbvZOkkH6xV/EbxyT5j96usa6cGZzk7cuUOreMzKAToPpRlttPKsnZxZgx5VocFcm057LR7mMVwL38pMY4dgNqu8QEUHbsHIpn8M1Ph4OQN/URQeGL3GWeUdgiRUSKhckXivSJqrHXcpX60VhXQEu0ut2XEVHJVGIxHJI70WTNtn7LXPCkFdob6g10iKBxSuV5W1WhvtBM0Rw3FDI89xVO5UVZHv8AW6M6gdLmZtYMnz1nX4034VfZlKHpr8zRNnKwukjsKssIFuuBp93Rm009hIalJOxfisNPrQF3A6gZuboDr/yPhRj3SboWdIJ+QofCWpxNvN7un6TUJKkzUqk186Ab6XLZ1mJ68yn47ioeOp1IKnuuon9RT3F2Q2QD8Tt9JpDfwpgsPzlex3ipR0y9GUk5w9UEWsQSNMrjzA/9Cqr94bBMvx0PwIM0HdtFW1Go7aNXC+3efI7/AD61zxtDxzxfJY5Xqk+YMfQCKnbuQNB0661SGQ+8Cv6fMaUW3DzE5x8h+s0rdclY+Lg8XHHr9AP5r37cP8iq2w0A8w+lRXDkiRt8P5oqfqHu/QEbQAyPQHX5dq8VHbYR60TaQaHrRNptYprElJdWRS2etX2rB7iu4g3hhSTqwNKnxJJ3IFdDFqVk552nSHN4RyQrMeka0suu0ka6aR0Hyo3gaG9iUH+aCo40qouAat4hA9AarCMYuupCeqS1MJwmHKLczH/4wfnP8U0u3M10hdosfPNS28GYvm0AtCf2opr4DkL/APpHyM0HFyd++g8WoqvfUW4wn7S8/nP60djCDY/30JjF5lbuzn/yoi8fuv8AfV0tkZnL4iuzay239R+tNsG/3T6/gpbdPI2vUVbhb0Iw7rH1qlWiLlQ2w+Nbw1HZYqzhV0nl6ZifpVC3RlUf0gfSrMEYA9aooWuDPLJTW4ReunxSesftVeJOYqDRWIANyf6R+lQvLqsUyhwSll53BcQOUjpNEPfK2mT8yiuxK6fGvOJXByjsgH0oOA0clW7AsFZU27hO4WR86Ewafd3D5j967xSAwHXeqrF3KjDuR+9CUXuUhNbE8LchLn9y/vRF7FDxWPe0BQFt+R/7l/eh8Q8sD5AUmi2UU6S9+ZXjbnOCOx+s1bgbxJVj/wBRB/4kUNcOvwou2mVxbHVkb/xpZxVUWxzd2W4S4Tctgb5rg/WqrVwZbasP/wAjX0za0PhsR4d4N0Vm+s1Z4gKJ38Yn5ms88W/v1NMM23v0DeJYVWxV9RsqyPnFIBhSyswEhTBpzJF+9/Z/FQ4TdH2bEA9TI+VRWrHHz4KtRyS8viEE0VbYEaso8o/ehVGhPnVtrDsylgNBvVZRTIxlJcBAtg9akLZ6H5GgUcjarlxPlU3jfQtHO+pUb0CutYogzQ01K2NaqooiwzH32uZSeggURxTBC0tvuwk15xRlC2wvQTQ3EcWbhWeigV0bdVwF1vfJbwfEMt0ZNzI+lXYdRkuO2rBh9TrQfDr2Rs3kf0qVuYPmZqijvYkpUqD+JYgs7EaAqPlUXYjUdkPyqWIST6KBVuJWTp2X9KpGGyRCeTdtlRuStsds0/EzVrOSoHnNdbs1OAKvHGZ5ZbKzrVloV1erVFFEnJsNsmmOHWldg04wUGrRSMmVtBSpVosVdYt+VFC1FU0pbGTW2LHsUJiFp9cseVAX7Wu1K0mhlNoz19aDuLTXFJBOlLLlTaRsxyB2qthVxqBqelGhMFu0XgW++RvMfpVN1Zqq28H41KcS8JHX1lm/uP60SLf3S989RtKSR5zRi2eRR1z1NoOuj11yXnzdU/ihcBh81q9TbFoDcJP5I+lB4SwwS5HaouFx+haOZaq+Znlw7ZWIGg3px7M3F8K8G33FW8PgWrimgOF4QtnymNKnlhqTT2NOHJTTW4Jh7Oe6VHnVN62VJFTwtzw7gPaRUcTfliaO6fods0CGvQaia9Wicy1pMTU7o1FRyzRLJtTpE5SogtqDReHsk15atTTbA4Xyq0YmTLlpHhsyT8B8quTC7mmtjAn5ipPho9KtGBgnntiV0oZxR+JXegLlUY8HZGakpqqasQ0pRoKsinfDiDSK1Tnhg11qsDHnWxpMIk9KZW7PlPXaqcBb7T+1OLNrQd/hFGcgYMdoW3LHfTrt+1KcbaMH/Otax8OIPelPELI1k9NAKEXYc2KlZisYN5pTeFaDidvypHdWK6SBhlsBtVLGrbpod2qTZsijiapcVItUCaVuyyROw8EeVMMNcGmv4ppSats3YqbDJWjUOmZ58qIwNgKHHcUowl8HfWneFOZTG/8AnWhptUY5ScJWKzw8ZCfrQ3DUyM3Y1qreGlSo+R+tDXeHAKw2P+dKTJFU0WwZ2pJmHTDB75B2M0vxeHKuV7Gn921lcGNZpZxDVyaRxaZvx5VJCerLYrq6po0SClWjLNmYrq6rwRjyNjrA4Ga02B4eoAr2urQkeVkk2w8YUCgsaqqJrq6rVsR6mcxjz6UruV5XUj2NmMqzCvUuCurqnZq0JoMsuO/6034fdWd/1rq6qKbRly4kzYcHxiDQsPPRvXtWksY2ztnA9Fb+K6uqeXI3uW7NiikEm/ZI9+T5q38UmxuMswRmB+DfxXV1Rx5JWacmKLRk+I4hJIzD5H+KzeMvJOh/X+K6urTLIzz4dnipcsXX7y9/1oRro7/rXV1Rc2zbDEiBuDv+tVm6O9dXUrkyqxo88Qd688Qd66uoahu7QTh8TrE0+wOL7GPSurqaLsydpgkavB3gQDBJjWrfBIMxIIJiurqePkedwxNi+HhmJMCsvj+Hw1dXV04pGjBNn//Z'
        }
      ]
    },
    mandaps: {
      title: 'Mandap Designs',
      items: [
        {
          id: 'm1',
          name: 'Traditional Red & Gold',
          price: 150000,
          
          style: 'Traditional',
          image : 'https://i.pinimg.com/originals/28/dd/c7/28ddc75e79111c494c8777db37aeac26.jpg'
        },
        {
          id: 'm2',
          name: 'Floral Paradise',
          price: 200000,
          
          style: 'Modern',
          image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkcXv5w45YUqB70lFeeZ8p0p9AWNtBHk4FOA&s'
        },
        {
          id: 'm3',
          name: 'Contemporary White',
          price: 180000,
          
          style: 'Contemporary',
          image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrleP5UiZJ8FCvbWFmQS1eQlY-SixyWhj-gQ&s'
        }
      ]
    },
    entrance: {
      title: 'Entrance Decorations',
      items: [
        {
          id: 'e1',
          name: 'Royal Arch Gateway',
          price: 100000,
          image: 'https://i.pinimg.com/736x/b7/1a/6a/b71a6a710dec853a14cacf29dc9007a3.jpg'

        },
        {
          id: 'e2',
          name: 'Floral Tunnel',
          price: 150000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaBAWWdsnHzgUekhs2xWqb9AF8AIxTrnW47A&s'
        },
        {
          id: 'e3',
          name: 'LED Light Curtain',
          price: 120000,
          image: 'https://shadidecor.com/wp-content/uploads/2024/05/Blue-LED-ceiling-Curtain.png'
        }
      ]
    },
    dining: {
      title: 'Dining Setup',
      items: [
        {
          id: 'd1',
          name: 'Royal Banquet',
          price: 200000,
          image: 'https://cdn0.weddingwire.in/vendor/6060/3_2/960/jpeg/royalebanquet-co-in-6a13-18_15_136060.jpeg',
          capacity: '500 guests'
        },
        {
          id: 'd2',
          name: 'Garden Setup',
          price: 150000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnhJBZ0YotuH4VCs9y46La0hv8YG7cI_wrAA&s',
          capacity: '300 guests'
        },
        {
          id: 'd3',
          name: 'Modern Minimalist',
          price: 180000,
          image: 'https://www.lolavalentina.com/wp-content/uploads/2022/11/Lola_Minimalist-Blog-2.jpg',
          capacity: '400 guests'
        }
      ]
    },
    lighting: {
      title: 'Lighting Arrangements',
      items: [
        {
          id: 'l1',
          name: 'Fairy Light Canopy',
          price: 80000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUyn_U0cdoael1hqjIbQZQ3dD-Ay7tmbH_yw&s'
        },
        {
          id: 'l2',
          name: 'Crystal Chandeliers',
          price: 120000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Tw7MpwCshnbbjxrHxZcE7iGTK-rHF-69-w&s'
        },
        {
          id: 'l3',
          name: 'LED Mood Lighting',
          price: 100000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCIGE2osKyTnhXtriaQXJZ-SxNsLc-j7cwAQ&s'
        }
      ]
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="custom-wedding-container1">
      
      
      <div className="main-content1">
        <h1 className="page-title1">Custom Wedding Designer</h1>
        <div className="cart-total1">
          <span className="cart-icon1">🛒</span>
          Total: ₹{calculateTotal()}
        </div>

        <div className="section-buttons1">
          {Object.keys(weddingOptions).map((section) => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`section-button1 ${selectedSection === section ? 'active' : ''}`}
            >
              {weddingOptions[section].title}
            </button>
          ))}
        </div>

        <div className="items-grid1">
          {weddingOptions[selectedSection].items.map((item) => (
            <div key={item.id} className="item-card1">
              <img src={item.image} alt={item.name} className="item-image1" />
              <div className="item-details1">
                <h3 className="item-name1">{item.name}</h3>
                <p className="item-price1">₹{item.price.toLocaleString()}</p>
                {item.location && <p className="item-info1">Location: {item.location}</p>}
                {item.capacity && <p className="item-info1">Capacity: {item.capacity}</p>}
                {item.style && <p className="item-info1">Style: {item.style}</p>}
                <button onClick={() => addToCart(item)} className="add-to-cart-button1">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default CustomWedding;