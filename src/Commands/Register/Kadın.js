const { MessageEmbed } = require("discord.js");
const settings = require("../../Config/Striga");
const ms = require("ms");
const db = require("quick.db");
const moment = require("moment");
const cdb = new db.table("Cezalar");
const ydb = new db.table("Yetkili");
const kdb = new db.table("Kullanici");
const skdb = new db.table("Sayi");
const nodb = new db.table("CezaNumarasi");
moment.locale("tr");
let Cinsiyet = ("KADIN");
module.exports = {
  conf: {
    name: "k",
    aliases: ["k", "woman", "kadın"],
    help: "!kadın @DROPİNNEM/ID İsim Yaş"
  },
  stg: async (
    client,
    message,
    args,
    config,
    embed,
    nembed,
    SRol,
    SKanal,
    SEmoji
  ) => {
    if (
      !SRol.KayıtYetkilisi.some(rol => message.member.roles.cache.has(rol)) &&
      !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) &&
      !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol)) &&
      !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol)) &&
      !message.member.hasPermission("ADMINISTRATOR")
    )
      return message.channel
        .send(
          nembed.setDescription(
            `<a:carpi:781345535810076694> Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`
          )
        )
        .then(x => x.delete({ timeout: 6500 }), message.react(SEmoji.Reddet));

    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member)
      return message.channel
        .send(
          nembed.setDescription(
            `İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`
          )
        )
        .then(x => x.delete({ timeout: 6500 }), message.react(SEmoji.Reddet));
    if (!args[1])
      return message.channel
        .send(nembed.setDescription(`İşlem geçersiz, bir isim belirtin.`))
        .then(x => x.delete({ timeout: 6500 }), message.react(SEmoji.Reddet));
    if (!args[2])
      return message.channel
        .send(nembed.setDescription(`İşlem geçersiz, bir yaş belirtin.`))
        .then(x => x.delete({ timeout: 6500 }), message.react(SEmoji.Reddet));
    let Name = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase();
    let Age = Number(args[2]);
    if (!Name || !Age)
      return message.channel
        .send(
          nembed.setDescription(
            `İşlem geçersiz, lütfen geçerli bir isim veya yaş belirtin`
          )
        )
        .then(x => x.delete({ timeout: 6500 }), message.react(SEmoji.Reddet));
    if (member.id === message.author.id)
      return message.channel
        .send(
          nembed.setDescription(
            `İşlem geçersiz, kendinize bu işlemi yapamazsınız.`
          )
        )
        .then(x => x.delete({ timeout: 6500 }), message.react(SEmoji.Reddet));

    const ServerDisplayName = `${
      member.user.username.includes(settings.sunucuTag)
        ? settings.sunucuTag
        : settings.tagsızTag
    } ${Name} | ${Age}`;
member.setNickname(`${ServerDisplayName}`); member.roles.add(SRol.KadınRol_1); member.roles.add(SRol.KadınRol_2); member.roles.remove(SRol.KayıtsızRolü); 

var sayi = 1
    kdb.push(`kullanici.${member.id}.isimler`, {
      User: member.id,
      DisplayName: ServerDisplayName,
      Cinsiyet: Cinsiyet,
      Role: `<@&${SRol.ErkekRol_1}>`,
       Date: moment().format(`L | HH:mm`)
    });
    ydb.add(`yetkili.${message.author.id}.kadin`, 1);
    ydb.add(`yetkili.${message.author.id}.toplam`, 1);

    let isimler = kdb.get(`kullanici.${member.id}.isimler`);
    let isimlerData = isimler.reverse().reverse();
    let page = 1;
    let isimlerinformation =
      isimlerData.length > 0
        ? isimlerData.map(
            x => `\`${sayi++}.\` **${x.DisplayName}** \`(${x.Cinsiyet})\` \`${x.Date}\` [${message.author}]`
          )
        : `${member} adlı kullanıcının herhangi bir isimler kayıtı yok.`;
    var strigalamacool = `${isimlerinformation
      .slice(page == 1 ? 0 : page * 5 - 5, page * 5)
      .join("\n")}`;

    if (isimler.length < 2)
      return message.channel
        .send(
          embed
            .setDescription(
              `${member}(\`${member.id}\` adlı kullanıcı \n ${message.author} (\`${message.author.id}\`)  tarafından kayıt edildi `
            )
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setColor(client.womanColor())
        )
        .then(x => x.delete({ timeout: 15000 }), message.react(SEmoji.Onayla));

    message.channel
      .send(
        embed
          .setDescription(
            `${member}(\`${member.id}\` adlı kullanıcı \n ${message.author} (\`${message.author.id}\`)  tarafından kayıt edildi \n\n **Kullanıcının önceki kayıtlardan isimleri bulundu**\n ${strigalamacool}`
          )
          .setThumbnail(member.user.avatarURL({ dynamic: true }))
          .setColor(client.womanColor())
      )
      .then(x => x.delete({ timeout: 15000 }), message.react(SEmoji.Onayla));

    client.channels.cache.get(SKanal.Kayıt_Log).send(
      nembed
        .setAuthor(`Bir Kullanıcı Kayıt Edildi.`)
        .setDescription(
          `
❯ Kullanıcı: ${member} | **\`${member.id}\`**
❯ Yetkili: ${message.author} | **\`${message.author.id}\`**
❯ İsim Yaş: **\`${ServerDisplayName}\`**
❯ Cinsiyet: **Kadın** - (<@&${SRol.KadınRol_1}>)
❯ Kanal: **${message.channel.name}** - (<#${message.channel.id}>)
❯ Tarih: **\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`**
`
        )
        .setColor(client.womanColor())
    );
  }
};
