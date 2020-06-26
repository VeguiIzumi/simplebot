const { Client, Collection } = require('discord.js');
const { dev } = require('../config.json');
class nancyClient extends Client {
  /**
	 * @property {string|string[]|Set<string>} [owner]
	 */
  constructor (options) {
    super (options);

    this.fetch = require('node-superfetch');
    this.dev = dev;

    if(options.owner) {
			this.once('ready', () => {
				if(options.owner instanceof Array || options.owner instanceof Set) {
					for(const owner of options.owner) {
						this.users.fetch(owner).catch(err => {
							this.emit('warn', `Unable to fetch owner ${owner}.`);
							this.emit('error', err);
						});
					}
				} else {
					this.users.fetch(options.owner).catch(err => {
						this.emit('warn', `Unable to fetch owner ${options.owner}.`);
						this.emit('error', err);
					});
				}
			});
		}
  }
  /**
	 * {@link nancyClientOptions#owner} option
	 * {@link nancyClient#isOwner}.</info>
	 * @type {?Array<User>}
	 * @readonly
	 */
	get owners() {
		if(!this.options.owner) return null;
		if(typeof this.options.owner === 'string') return [this.users.cache.get(this.options.owner)];
		const owners = [];
		for(const owner of this.options.owner) owners.push(this.users.cache.get(owner));
		return owners;
	}

}

module.exports = nancyClient;