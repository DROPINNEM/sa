const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'rol-say', aliases: ["rolleri-göster"], help: "Rol bilgisi"},
stg: async(client, message, args, config, embed, nembed, SRol, SKanal, SEmoji) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(nembed.setDescription(`Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.`)).then(x => x.delete({timeout:6500}), message.react(SEmoji.Reddet))

const member = message.mentions.users.first()
if(!message.member.hasPermission('MANAGE_ROLES')) return;
let chimped = message.guild.roles.cache.filter(a => a.name !== 'everyone' && !a.managed).sort((a, b) => a.position - b.position).map(c => `${c} (**${c.members.size}**)`).reverse()
 const sa = new MessageEmbed()
.setColor('RANDOM')
 .setTitle(`${message.guild.name} Sunucunun rolleri`)
.setThumbnail(message.author.avatarURL({dynamic: true}))
.setFooter(`${message.author.tag} Tarafından Kullanıldı`)
.setDescription(chimped.join(`\n`))
message.channel.send(sa)
}}