const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const moment = require("moment");
const cdb = new db.table("Cezalar");
const ydb = new db.table("Yetkili");
const kdb = new db.table("Kullanici");
const skdb = new db.table("Sayi");
const nodb = new db.table("CezaNumarasi");
require("moment-duration-format");

module.exports = {
conf: {name: 'user', aliases: ["info", "kullanıcı"], help: "Kullanıcının bilgilerini gösterir.\n!user @DROPİNNEM/ID"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!user) return message.channel.send(nembed.setDescription(`İşlem için birisini belirtmelisin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.SEmoji.Reddet))

const member = message.guild.member(user);

var emojidurum = {"idle": ""+SEmoji.idle+"\`Boşta\`", "offline": ""+SEmoji.offline+"\`Çevirimdışı\`", "online": ""+SEmoji.online+"\`Çevirimiçi\`", "dnd": ""+SEmoji.dnd+"\`Rahatsız Etme\`"}

require("moment-duration-format");
  



        
   const katılma = `\`${moment(member.user.joinedAt).format("MMMM Do YYYY  h:mm:ss")}\``;
const  katılamönce = `${moment(user.joinedAt).fromNow()}`
const kuruluş = `\`${moment(member.user.createdAt).format("MMMM Do YYYY  h:mm:ss")}\``;
const  kuruluşönce = `${moment(member.user.createdAt).fromNow()}`;
moment.locale("tr");
const status = emojidurum[user.presence.status]
let yuksek = member.roles.highest


let isimler = kdb.get(`kullanici.${member.id}.isimler`) || [];
let isimlerData = isimler.reverse().reverse();
let page = 1;
let isimlerinformation = isimlerData.length > 0 ?  isimlerData.map(x =>  `<@!${x.Admin}>`) :``
   var strigalamacool = `${isimlerinformation.slice(page == 1 ? 0 : page * 10 - 10, page * 1)}`;
  
  let dsplay = isimlerData.length > 0 ? isimlerData.map(x => `\`${x.DisplayName}\` (\`${x.Cinsiyet}\`)`) : ``
   var dropinnemcool = `${dsplay
      .slice(page == 1 ? 0 : page * 10 - 10, page * 1)
}`;
  
    let date = isimlerData.length > 0 ? isimlerData.map(x => `\`${x.Date}\``) : ""
   var dropinnemcool2= `${date
     .slice(page == 1 ? 0 : page * 10 - 10, page * 1)
   }`;
 {   
   
  
    if (isimler.length < 2)
      return message.channel.send(embed.setThumbnail(member.user.avatarURL({dynamic:true}))
   .setDescription(`
**Kullanıcı Detayları
\`•\` Kullanıcı Profili: ${member.user}
\`•\` Kullanıcı İd: \`${member.user.id}\`
\`•\` Kullanıcı Adı: \`${member.displayName}\`
\`•\` Kullanıcı Durumu: ${status}  
\`•\` Discord Katılım:  ${kuruluş} ${kuruluşönce}
\`•\` Sunucu Katılım:  ${katılma} ${katılamönce}
  

Rol Bilgisi;
 ${member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') : 'Herhangi bir role sahip değil.'}**

`));

         message.channel.send(embed.setThumbnail(member.user.avatarURL({dynamic:true}))
  .setDescription(`
**Kullanıcı Detayları
\`•\` Kullanıcı Profili: ${member.user}
\`•\` Kullanıcı İd: \`${member.user.id}\`
\`•\` Kullanıcı Adı: \`${member.displayName}\`
\`•\` Kullanıcı Durumu: ${status}
\`•\` Discord Katılım:  ${kuruluş} ${kuruluşönce}
\`•\` Sunucu Katılım:  ${katılma} ${katılamönce}

Rol Bilgisi;

${member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') : 'Herhangi bir role sahip değil.'}

Kayıt Bilgileri

\`•\` Kayıt Eden Yetkili: ${strigalamacool}
\`•\` Kayıt Bilgileri: ${dropinnemcool}
\`•\` Kayıt Tarihi: ${dropinnemcool2} **

`))
   
 }
  
 }
}


