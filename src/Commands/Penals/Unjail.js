const {MessageEmbed} = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const moment = require('moment')
const cdb = new db.table('Cezalar')
const ydb = new db.table('Yetkili')
const kdb = new db.table('Kullanici')
const nodb = new db.table('CezaNumarasi')


module.exports = {
conf: {name: 'unjail', aliases: ["jailun", "ceza-un"], help: "!jail @DROPİNNEM/ID Süre Sebep"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.JailYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]); let sebep = args[1]; 
if(!member) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!sebep) return message.channel.send(nembed.setDescription(`İşlem geçersiz, geçerli bir süre veya sebep belirtmen gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`İşlem geçersiz, kendinize bu işlemi yapamazsınız.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))


   

  
message.channel.send(nembed.setDescription(`İşlem başarılı,  kişinin başarıyla jaili kaldırıldı `))

if(member.voice.channel) member.voice.kick().catch();
member.roles.cache.forEach(s => member.roles.remove(s.id));
member.roles.remove(SRol.JailRolü)
member.roles.remove(SRol.JailRolü)
member.roles.remove(SRol.JailRolü)



client.channels.cache.get(SKanal.Jail_Log).send(new MessageEmbed().setTitle(`Bir Kullanıcının Cezası Kaldırıldı.`).setDescription(`${member} kullanıcısı sunucumuzdan ${sebep} gerekçesiyle  ${message.author} tarafından cezası kaldırıldı.\n\n❯ Kullanıcı: ${member} | **\`${member.id}\`**\n❯ Yetkili: ${message.author} | **\`${message.author.id}\`**\n❯ Sebep: **\`${sebep}\`**\n\n ❯ Tarih: **\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`**`).setColor(`#f9dfdc`))
    }
    }



