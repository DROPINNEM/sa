const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'vip', aliases: ["özel-üye"], help: "Belirtilen kullanıcıya vip rolü verir.\n!vip @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!SRol.OwnerPerms.some(rol => message.member.roles.cache.has(rol)) && !SRol.HighStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !SRol.LowStaffPerms.some(rol => message.member.roles.cache.has(rol))  && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`İşlem için birisini belirtmelisin.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))


if(member.roles.cache.get(SRol.VipRolü)) {
member.roles.remove(SRol.VipRolü)
message.channel.send(embed.setDescription(`${member} adlı kullanıcıdan <@&${SRol.VipRolü}> alındı.`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla))
} else {
member.roles.add(SRol.VipRolü)
message.channel.send(embed.setDescription(`${member} adlı kullanıcıya <@&${SRol.VipRolü}> verildi.`)).then(x => x.delete({timeout:15000}), message.react(SEmoji.Onayla))
}
}}