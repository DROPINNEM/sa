const {MessageEmbed} = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const moment = require('moment')
const cdb = new db.table('Cezalar')
const ydb = new db.table('Yetkili')
const kdb = new db.table('Kullanici')
const nodb = new db.table('CezaNumarasi')


module.exports = {
conf: {name: 'jail', aliases: ["cezalandır", "ceza-ver", "temp-jail", "tempjail"], help: "!jail @DROPİNNEM/ID Süre Sebep"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.JailYetkilisi.some(rol => message.member.roles.cache.has(rol)) && !SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]); let sure = args[1]; let sebep = args.splice(2).join(" ");
if(!member) return message.channel.send(nembed.setDescription(`İşlem geçersiz, bir kullanıcı belirtmeniz gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(!sure || !sebep) return message.channel.send(nembed.setDescription(`İşlem geçersiz, geçerli bir süre veya sebep belirtmen gerekiyor.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.roles.cache.get(SRol.JailRolü)) return message.channel.send(nembed.setDescription(`İşlem geçersiz, kullanıcı Jail rolüne sahip`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`İşlem geçersiz, kendinize bu işlemi yapamazsınız.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`İşlem geçersiz, senden üst/aynı pozisyonda birisine bunu yapamazsın.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
let zaman = args[1].replace(`gün`," Gün").replace(`saniye`," Saniye").replace(`saat`," Saat").replace(`dakika`," Dakika").replace(`hafta`," Hafta")
let cezano = nodb.get(`cezano.${message.guild.id}`) + 1;
let cezaData = {No: cezano, User: member.id, Admin: message.author.id, Status: true, Time: zaman, Reason: sebep, FinishDate: Date.now()+ms(sure), Date: Date.now(), Type: client.Types.TempJail}


nodb.add(`cezano.${message.guild.id}`, 1)
let jailedMembers = cdb.get(`TempJail`) || [];
if(!jailedMembers.some(s => s.id == member.id)) {
kdb.set(`cezano.${cezano}`, cezaData)    
ydb.add(`yetkili.${message.author.id}.jail`, 1)
ydb.add(`yetkili.${message.author.id}.toplamceza`, 1)
kdb.push(`kullanici.${member.id}.sicil`, cezaData)
cdb.push(`TempJail`, {No: cezano, User: member.id, Status: true, FinishDate: Date.now()+ms(sure)})
}

message.channel.send(nembed.setDescription(`İşlem başarılı,  kişiye başarıyla jail atıldı `))
member.roles.cache.forEach(r => {
member.roles.remove(r.id)
db.set(`${message.guild.id}.jail.${member.id}.roles.${r.id}`, r.id )})
moment.locale("tr");
client.channels.cache.get("866768314968834088").send(new MessageEmbed().setTitle(`Bir Üye Cezalandırıldı !`).setFooter(message.author.tag, message.author.avatarURL({dynamic:true})).setTimestamp().setDescription(`sa`));
    member.roles.add(SRol.JailRolü)
setTimeout(async () =>{
member.roles.remove(SRol.JailRolü)
client.channels.cache.get("866768314968834088").send(new MessageEmbed().setTitle(`Bir Üyenin Cezası Bitti.`).setFooter(message.author.tag, message.author.avatarURL({dynamic:true})).setTimestamp().setDescription(`sail atıld`));
}, ms(sure));
            setTimeout(async () =>{
message.guild.roles.cache.forEach(async r => {
const roller = await db.fetch(`${message.guild.id}.jail.${member.id}.roles.${r.id}` )
if(roller != r.id)  return ;
if(roller){member.roles.add(roller)}
db.delete(`${message.guild.id}.jail.${member.id}.roles.${r.id}`)
})
              }, ms(sure));
}}