const config = require("./config.json");
const { client } = require("./whatsapp");
const { Telegraf } = require("telegraf");
const { MessageMedia } = require("whatsapp-web.js");

const bot = new Telegraf("6517673520:AAEAFDQoE5jeAUsDSBs6xA1MPgCBnNInYHM");

async function handleChannelPost(ctx) {
  try {
    const post = ctx.update.channel_post;
    const chatId = post.chat.id;

    if (chatId !== config.telegramChatId) {
      return;
    }
    const file_id =
      post.photo?.[post.photo.length - 1]?.file_id ||
      post.audio?.file_id ||
      post.video?.file_id ||
      post.document?.file_id;
    const file_name = post.document?.file_name;

    if (file_id) {
      const file_url = await ctx.telegram.getFileLink(file_id);
      const media = await MessageMedia.fromUrl(file_url.href, {
        filename: file_name,
      });
      const message = await client.sendMessage(config.whatsappChatId, media, {
        caption: post.caption,
      });
    } else {
      const message = await client.sendMessage(
        config.whatsappChatId,
        post.text
      );
    }
  } catch (error) {
    console.log(error);
  }
}

bot.on("channel_post", (ctx) => handleChannelPost(ctx));

bot.hears("ping", (ctx) => ctx.reply("pong"));

module.exports = { bot };
