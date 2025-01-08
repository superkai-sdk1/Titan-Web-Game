/** Amazing Audio Player - HTML5 Audio Player for Your Website
 * Copyright 2013 Magic Hills Pty Ltd All Rights Reserved
 * Website: http://amazingaudioplayer.com
 * Version 3.4
 */
var viewObj = function(obj){
    for (var n in obj) {
        var
            key = n,
            type = typeof(obj[n]),
            value = obj[n];
         	alert('obj.'+key+' = ('+type+') '+value);
    }
}

var AmazingAudioPlatforms = {
	flashInstalled: function() {
		var flashInstalled = false;
		return flashInstalled
	},
	html5VideoSupported: function() {
		return !!document.createElement("video").canPlayType
	},
	isChrome: function() {
		return navigator.userAgent.match(/Chrome/i) != null
	},
	isFirefox: function() {
		return navigator.userAgent.match(/Firefox/i) != null
	},
	isOpera: function() {
		return navigator.userAgent.match(/Opera/i) != null
	},
	isSafari: function() {
		return navigator.userAgent.match(/Safari/i) != null
	},
	isAndroid: function() {
		return navigator.userAgent.match(/Android/i) != null
	},
	isIPad: function() {
		return navigator.userAgent.match(/iPad/i) != null
	},
	isIPhone: function() {
		return navigator.userAgent.match(/iPod/i) != null || navigator.userAgent.match(/iPhone/i) != null
	},
	isIOS: function() {
		return this.isIPad() || this.isIPhone()
	},
	isMobile: function() {
		return this.isIPad() || this.isIPhone() || this.isAndroid()
	},
	isIE9: function() {
		return navigator.userAgent.match(/MSIE 9/i) != null && !this.isOpera()
	},
	isIE8: function() {
		return navigator.userAgent.match(/MSIE 8/i) != null && !this.isOpera()
	},
	isIE7: function() {
		return navigator.userAgent.match(/MSIE 7/i) != null && !this.isOpera()
	},
	isIE6: function() {
		return navigator.userAgent.match(/MSIE 6/i) != null && !this.isOpera()
	},
	isIE678: function() {
		return this.isIE6() || this.isIE7() || this.isIE8()
	},
	isIE6789: function() {
		return this.isIE6() || this.isIE7() || this.isIE8() || this.isIE9()
	},
	css33dTransformSupported: function() {
		return !this.isIE6() && !this.isIE7() && !this.isIE8() && !this.isIE9() && !this.isOpera()
	},
	applyBrowserStyles: function(object, applyToValue) {
		var ret = {};
		for (var key in object) {
			ret[key] = object[key];
			ret["-webkit-" + key] = applyToValue ? "-webkit-" + object[key] : object[key];
			ret["-moz-" + key] = applyToValue ? "-moz-" + object[key] : object[key];
			ret["-ms-" + key] = applyToValue ? "-ms-" + object[key] : object[key];
			ret["-o-" + key] = applyToValue ? "-o-" + object[key] : object[key]
		}
		return ret
	}
};
(function($) {
	$.fn.amazingaudioplayer = function(options) {
		var PlayerSkin = function(amazingPlayer, container, options, id) {
			this.amazingPlayer = amazingPlayer;
			this.container = container;
			this.options = options;
			this.id = id;
			this.volumeSaved = 1;
			var instance = this;
			var isTouch = "ontouchstart" in window;
			var eStart = isTouch ? "touchstart" : "mousedown";
			var eMove = isTouch ? "touchmove" : "mousemove";
			var eCancel = isTouch ? "touchcancel" : "mouseup";
			var formatSeconds = function(secs) {
				var hours = Math.floor(secs / 3600),
					minutes = Math.floor(secs % 3600 / 60),
					seconds = Math.ceil(secs % 3600 % 60);
				return (hours == 0 ? "" : hours > 0 && hours.toString().length < 2 ? "0" + hours + ":" : hours + ":") + (minutes.toString().length < 2 ? "0" + minutes : minutes) + ":" + (seconds.toString().length < 2 ? "0" + seconds : seconds)
			};
			var $bar = $("<div class='amazingaudioplayer-bar'></div>");
			$bar.appendTo(this.container);
			var $playpause = $("<div class='amazingaudioplayer-playpause'></div>");
			$playpause.appendTo($bar).css({
				display: "block"
			});
			var $play = $("<div class='amazingaudioplayer-play'></div>");
			$play.appendTo($playpause).css({
				display: "block",
				width: this.options.playpauseimagewidth,
				height: this.options.playpauseimageheight,
				"background-image": 'url("' + this.options.skinsfolder + this.options.playpauseimage + '")',
				"background-repeat": "no-repeat",
				"background-position": "left top",
				cursor: "pointer"
			}).hover(function() {
				$(this).css({
					"background-position": "left bottom"
				})
			}, function() {
				$(this).css({
					"background-position": "left top"
				})
			});
			var $pause = $("<div class='amazingaudioplayer-pause'></div>");
			$pause.appendTo($playpause).css({
				display: "none",
				width: this.options.playpauseimagewidth,
				height: this.options.playpauseimageheight,
				"background-image": 'url("' + this.options.skinsfolder + this.options.playpauseimage + '")',
				"background-repeat": "no-repeat",
				"background-position": "right top",
				cursor: "pointer"
			}).hover(function() {
				$(this).css({
					"background-position": "right bottom"
				})
			}, function() {
				$(this).css({
					"background-position": "right top"
				})
			});
			$play.click(function() {
				instance.amazingPlayer.playAudio()
			});
			$pause.click(function() {
				if (instance.options.stoponpausebutton) instance.amazingPlayer.stopAudio();
				else instance.amazingPlayer.pauseAudio()
			});
			this.container.bind("amazingaudioplayer.played", function(event, currentItem) {
				$play.css({
					display: "none"
				});
				$pause.css({
					display: "block"
				})
			});
			this.container.bind("amazingaudioplayer.paused", function(event, currentItem) {
				$play.css({
					display: "block"
				});
				$pause.css({
					display: "none"
				})
			});
			this.container.bind("amazingaudioplayer.stopped", function(event, currentItem) {
				$play.css({
					display: "block"
				});
				$pause.css({
					display: "none"
				})
			});
			var $prev = $("<div class='amazingaudioplayer-prev'></div>");
			$prev.appendTo($bar).css({
				display: "block",
				width: this.options.prevnextimagewidth,
				height: this.options.prevnextimageheight,
				"background-image": 'url("' + this.options.skinsfolder + this.options.prevnextimage + '")',
				"background-repeat": "no-repeat",
				"background-position": "left top",
				cursor: "pointer"
			}).hover(function() {
				$(this).css({
					"background-position": "left bottom"
				})
			}, function() {
				$(this).css({
					"background-position": "left top"
				})
			});
			var $next = $("<div class='amazingaudioplayer-next'></div>");
			$next.appendTo($bar).css({
				display: "block",
				width: this.options.prevnextimagewidth,
				height: this.options.prevnextimageheight,
				"background-image": 'url("' + this.options.skinsfolder + this.options.prevnextimage + '")',
				"background-repeat": "no-repeat",
				"background-position": "right top",
				cursor: "pointer"
			}).hover(function() {
				$(this).css({
					"background-position": "right bottom"
				})
			}, function() {
				$(this).css({
					"background-position": "right top"
				})
			});
			$prev.click(function() {
				instance.amazingPlayer.audioRun(-2, instance.amazingPlayer.audioPlayer.isPlaying)
			});
			$next.click(function() {
				instance.amazingPlayer.audioRun(-1, instance.amazingPlayer.audioPlayer.isPlaying)
			});
			if (!AmazingAudioPlatforms.isIOS() && !AmazingAudioPlatforms.isAndroid()) {
				this.$volume = $("<div class='amazingaudioplayer-volume'></div>");
				this.$volume.appendTo($bar);
				this.$volumeButton = $("<div class='amazingaudioplayer-volume-button'></div>");
				this.$volumeButton.appendTo(this.$volume);
				this.$volume.css({
					display: "block"
				});
				this.$volumeButton.css({
					display: "block",
					position: "relative",
					width: this.options.volumeimagewidth,
					height: this.options.volumeimageheight,
					"background-image": 'url("' + this.options.skinsfolder + this.options.volumeimage + '")',
					"background-repeat": "no-repeat",
					"background-position": "left top",
					cursor: "pointer"
				});
				this.$volumeButton.hover(function() {
					var backgroundPosX = $(this).css("background-position") ? $(this).css("background-position").split(" ")[0] : $(this).css("background-position-x");
					$(this).css({
						"background-position": backgroundPosX + " bottom"
					})
				}, function() {
					var backgroundPosX =
					$(this).css("background-position") ? $(this).css("background-position").split(" ")[0] : $(this).css("background-position-x");
					$(this).css({
						"background-position": backgroundPosX + " top"
					})
				});
				this.$volumeButton.click(function() {
					var volume = instance.amazingPlayer.audioPlayer.getVolume();
					if (volume > 0) {
						instance.volumeSaved = volume;
						volume = 0
					} else volume = instance.volumeSaved;
					var backgroundPosY = $(this).css("background-position") ? $(this).css("background-position").split(" ")[1] : $(this).css("background-position-y");
					instance.$volumeButton.css({
						"background-position": (volume > 0 ? "left" : "right") + " " + backgroundPosY
					});
					instance.amazingPlayer.audioPlayer.setVolume(volume);
					if (instance.options.showvolumebar) instance.$volumeBarAdjustActive.css({
						height: Math.round(volume * 100) + "%"
					})
				});
				this.$volumeBar = $("<div class='amazingaudioplayer-volume-bar'></div>");
				this.$volumeBar.appendTo(this.$volume);
				this.$volumeBarAdjust = $("<div class='amazingaudioplayer-volume-bar-adjust'></div>");
				this.$volumeBarAdjust.appendTo(this.$volumeBar);
				this.$volumeBarAdjustActive =
				$("<div class='amazingaudioplayer-volume-bar-adjust-active'></div>");
				this.$volumeBarAdjustActive.appendTo(this.$volumeBarAdjust);
				this.$volumeBar.css({
					display: "none",
					position: "absolute",
					left: 0,
					bottom: "100%",
					"-webkit-box-sizing": "content-box",
					"-moz-box-sizing": "content-box",
					"box-sizing": "content-box",
					width: this.options.volumeimagewidth - 2 * this.options.volumebarpadding,
					height: this.options.volumebarheight - 2 * this.options.volumebarpadding,
					padding: this.options.volumebarpadding
				});
				this.$volumeBarAdjust.css({
					display: "block",
					position: "relative",
					width: "100%",
					height: "100%",
					cursor: "pointer"
				});
				this.$volumeBarAdjustActive.css({
					display: "block",
					position: "absolute",
					left: 0,
					bottom: 0,
					width: "100%",
					height: "100%"
				});
				this.$volumeBarAdjust.bind(eStart, function(e) {
					var e0 = isTouch ? e.originalEvent.touches[0] : e;
					var vol = 1 - (e0.pageY - instance.$volumeBarAdjust.offset().top) / instance.$volumeBarAdjust.height();
					vol = vol > 1 ? 1 : vol < 0 ? 0 : vol;
					instance.$volumeBarAdjustActive.css({
						height: Math.round(vol * 100) + "%"
					});
					instance.$volumeButton.css({
						"background-position": "left " + (vol > 0 ? "top" : "bottom")
					});
					instance.amazingPlayer.audioPlayer.setVolume(vol);
					instance.$volumeBarAdjust.bind(eMove, function(e) {
						var e0 = isTouch ? e.originalEvent.touches[0] : e;
						var vol = 1 - (e0.pageY - instance.$volumeBarAdjust.offset().top) / instance.$volumeBarAdjust.height();
						vol = vol > 1 ? 1 : vol < 0 ? 0 : vol;
						instance.$volumeBarAdjustActive.css({
							height: Math.round(vol * 100) + "%"
						});
						instance.$volumeButton.css({
							"background-position": "left " + (vol > 0 ? "top" : "bottom")
						});
						instance.amazingPlayer.audioPlayer.setVolume(vol)
					})
				}).bind(eCancel, function() {
					instance.$volumeBarAdjust.unbind(eMove)
				});
				this.hideVolumeBarTimeout = null;
				this.$volume.hover(function() {
					clearTimeout(instance.hideVolumeBarTimeout);
					if (AmazingAudioPlatforms.isIE678()) instance.$volumeBar.show();
					else instance.$volumeBar.fadeIn()
				}, function() {
					clearTimeout(instance.hideVolumeBarTimeout);
					instance.hideVolumeBarTimeout = setTimeout(function() {
						if (AmazingAudioPlatforms.isIE678()) instance.$volumeBar.hide();
						else instance.$volumeBar.fadeOut()
					}, 1E3)
				});
				this.container.bind("amazingaudioplayer.setvolume", function(event, volume) {
					volume = volume > 1 ? 1 : volume < 0 ? 0 : volume;
					var backgroundPosY = instance.$volumeButton.css("background-position") ? instance.$volumeButton.css("background-position").split(" ")[1] : instance.$volumeButton.css("background-position-y");
					instance.$volumeButton.css({
						"background-position": (volume > 0 ? "left" : "right") + " " + backgroundPosY
					});
					if (instance.options.showvolumebar) instance.$volumeBarAdjustActive.css({
						height: Math.round(volume * 100) + "%"
					})
				})
			}
			$bar.append("<div class='amazingaudioplayer-bar-buttons-clear'></div>");
		};
		var FlashHTML5Player = function(amazingPlayer, flashPlayerEngine) {
			this.amazingPlayer = amazingPlayer;
			this.container = this.amazingPlayer.container;
			this.id = this.amazingPlayer.id;
			this.flashPlayerEngine =
			flashPlayerEngine;
			this.html5Object = null;
			this.flashObject = null;
			this.isHtml5 = false;
			this.isPlaying = false;
			this.html5LoadUpdate = null;
			this.audioItem = null;
			var a = document.createElement("audio");
			this.supportMp3 = !! (a.canPlayType && a.canPlayType("audio/mpeg;").replace(/no/, ""));
			this.supportOgg = !! (a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ""));
			this.loadFlashTimeout = 0
		};
		FlashHTML5Player.prototype = {
			initHtml5: function() {
				var html5Object = $("<audio preload='" + (this.amazingPlayer.options.preloadaudio ? "auto" : "none") + "'></audio>");
				html5Object.appendTo(this.container);
				var html5Audio = html5Object.get(0);
				var instance = this;
				html5Audio.addEventListener("ended", function() {
					instance.amazingPlayer.onAudioEnded()
				});
				html5Audio.addEventListener("timeupdate", function() {
					instance.amazingPlayer.playProgress(html5Audio.currentTime * 1E3, html5Audio.duration * 1E3)
				});
				html5Audio.addEventListener("durationchange", function() {
					if (instance.isPlaying) html5Audio.play()
				});
				return html5Object
			},
			load: function(audioItem) {
				this.audioItem = audioItem;
				var audioSource = audioItem.source;
				var i;
				this.isHtml5 = false;
				if (!AmazingAudioPlatforms.isIE6789()) for (i = 0; i < audioSource.length; i++) if (audioSource[i].type == "audio/mpeg" && this.supportMp3 || audioSource[i].type == "audio/ogg" && this.supportOgg) {
					this.isHtml5 = true;
					break
				}
				if (this.amazingPlayer.options.forcefirefoxflash && AmazingAudioPlatforms.isFirefox() && !AmazingAudioPlatforms.isMobile()) this.isHtml5 = false;
				if (this.amazingPlayer.options.forcechromeflash && AmazingAudioPlatforms.isChrome() && AmazingAudioPlatforms.flashInstalled() && !AmazingAudioPlatforms.isMobile()) this.isHtml5 = false;
				if (this.amazingPlayer.options.forceflash && AmazingAudioPlatforms.flashInstalled() && !AmazingAudioPlatforms.isMobile()) this.isHtml5 = false;
				if (this.amazingPlayer.options.forcehtml5) this.isHtml5 = true;
				if (this.isHtml5) {
					if (!this.html5Object) this.html5Object = this.initHtml5();
					this.html5Object.get(0).pause();
					this.html5Object.empty();
					this.html5Object.currentTime = 0;
					this.amazingPlayer.playProgress(0, 0);
					for (i = 0; i < audioSource.length; i++) if (audioSource[i].type == "audio/mpeg" && this.supportMp3 || audioSource[i].type == "audio/ogg" && this.supportOgg) this.html5Object.append("<source src='" + audioSource[i].src + "' type='" + audioSource[i].type + "'></source>");
					this.amazingPlayer.playProgress(0, 0);
					this.html5AudioLoaded = false;
					if (this.amazingPlayer.options.preloadaudio) this.html5LoadAudio()
				} else {
					if (!this.flashObject) this.initFlash();
					this.amazingPlayer.playProgress(0, 0);
					this.flashAudioLoaded = false;
					this.flashAudioLoadedSucceed = false;
					this.playAudioAfterLoadedSucceed = false;
					if (this.amazingPlayer.options.preloadaudio) this.flashLoadAudio(this.getMp3Src(), false)
				}
			},
			html5LoadAudio: function() {
				this.html5AudioLoaded = true;
				this.html5Object.get(0).load();
				var html5Audio = this.html5Object.get(0);
				var instance = this;
				this.html5LoadUpdate = setInterval(function() {
					if (html5Audio.buffered && html5Audio.buffered.length > 0 && !isNaN(html5Audio.buffered.end(0)) && !isNaN(html5Audio.duration)) {
						var percent = Math.ceil(html5Audio.buffered.end(0) * 100 / html5Audio.duration);
						instance.amazingPlayer.loadProgress(percent);
						if (percent >= 100) clearInterval(instance.html5LoadUpdate);
						instance.amazingPlayer.playProgress(html5Audio.currentTime * 1E3, html5Audio.duration * 1E3)
					}
				}, 100)
			},
			play: function() {
				if (this.isHtml5) {
					if (!this.html5AudioLoaded) this.html5LoadAudio();
					this.html5Object.get(0).play()
				} else if (this.flashAudioLoadedSucceed) this.flashObject.playAudio();
				else if (this.flashAudioLoaded) this.playAudioAfterLoadedSucceed = true;
				else this.flashLoadAudio(this.getMp3Src(), true);
				this.isPlaying = true
			},
			getMp3Src: function() {
				var audioSource = this.audioItem.source;
				var mp3Src = "";
				for (var i =
				0; i < audioSource.length; i++) if (audioSource[i].type == "audio/mpeg") mp3Src = audioSource[i].src;
				return mp3Src
			},
			pause: function() {
				if (this.isHtml5) this.html5Object.get(0).pause();
				else this.flashObject.pauseAudio();
				this.isPlaying = false
			},
			stop: function() {
				if (this.isHtml5) {
					this.html5Object.get(0).pause();
					this.html5Object.get(0).currentTime = 0
				} else this.flashObject.stopAudio();
				this.isPlaying = false
			},
			setTime: function(pos, duration) {
				if (this.isHtml5) if (!isNaN(this.html5Object.get(0).duration) && isFinite(this.html5Object.get(0).duration) && this.html5Object.get(0).duration > 0) this.html5Object.get(0).currentTime = this.html5Object.get(0).duration * pos;
				else this.html5Object.get(0).currentTime = duration * pos;
				else this.flashObject.setTime(pos)
			},
			getVolume: function() {
				if (this.isHtml5) return this.html5Object.get(0).volume;
				else
				return this.flashObject.getVolume()
			},
			setVolume: function(val) {
				if (this.isHtml5) this.html5Object.get(0).volume = val;
				else if (this.flashObject) this.flashObject.setVolume(val)
			}
		};
		var AmazingAudioPlayer = function(container, options, id) {
			this.container =
			container;
			this.options = options;
			this.id = id;
			$(".amazingaudioplayer-engine").css({
				display: "none"
			});
			this.currentItem = -1;
			this.elemArray = new Array;
			this.elemLength = 0;
			this.audioPlayer = new FlashHTML5Player(this, this.options.jsfolder + "amazingaudioplayer.swf");
            this.initData(this.init)
		};
		AmazingAudioPlayer.prototype = {
			initData: function(onSuccess) {
				this.readTags();
				onSuccess(this)
			},
			readTags: function() {
				var instance = this;
				$("ul.amazingaudioplayer-audios", this.container).find("li").each(function() {
					var $this = $(this);
					var audioSource =
					new Array;
					$this.find("div.amazingaudioplayer-source").each(function() {
						audioSource.push({
							src: $(this).data("src"),
							type: $(this).data("type").toLowerCase()
						})
					});
					var audioId = instance.elemArray.length + 1;
					instance.elemArray.push({
						id: audioId,
						source: audioSource,
						title: $this.data("title") ? $this.data("title") : "",
						artist: $this.data("artist") ? $this.data("artist") : "",
						album: $this.data("album") ? $this.data("album") : "",
						info: $this.data("info") ? $this.data("info") : "",
						duration: $this.data("duration") ? $this.data("duration") : "",
						image: $this.data("image") && $this.data("image").length > 0 ? $this.data("image") : "",
						live: $this.data("live") ? true : false
					})
				});
				instance.elemLength = instance.elemArray.length
			},
			init: function(instance) {
				var i;
				if (instance.elemLength <= 0) return;
				if (instance.options.random) {
					for (i = instance.elemLength - 1; i > 0; i--) {
						if (i == 1 && Math.random() < 0.5) break;
						var index = Math.floor(Math.random() * i);
						var temp = instance.elemArray[index];
						instance.elemArray[index] = instance.elemArray[i];
						instance.elemArray[i] = temp
					}
					for (i = 0; i < instance.elemLength; i++) instance.elemArray[i].id = i + 1
				}
				instance.isPlaying = false;
				instance.loopCount = 0;
				instance.createSkin();
                var params = instance.getParams();
				var firstId = 0;
				if ("firstaudioid" in params && !isNaN(params["firstaudioid"]) && params["firstaudioid"] >= 0 && params["firstaudioid"] < instance.elemLength) firstId = params["firstaudioid"];
				instance.audioRun(firstId, false);
				if ("autoplayaudio" in params) if (params["autoplayaudio"] == "1") instance.options.autoplay = true;
				else if (params["autoplayaudio"] == "0") instance.options.autoplay = false;
				if (instance.options.autoplay && !AmazingAudioPlatforms.isIOS() && !AmazingAudioPlatforms.isAndroid()) window.setTimeout(function() {
					instance.playAudio()
				}, instance.options.autoplaytimeout);
				if (instance.options.defaultvolume >= 0) instance.setVolume(instance.options.defaultvolume / 100);
				instance.container.bind("amazingaudioplayer.stop", function(event, id) {
					if (id != instance.id && instance.audioPlayer.isPlaying) instance.pauseAudio()
				})
			},
			createSkin: function() {
				new PlayerSkin(this, this.container, this.options, this.id)
			},
			getParams: function() {
				var result = {};
				var params = window.location.search.substring(1).split("&");
				for (var i = 0; i < params.length; i++) {
					var value = params[i].split("=");
					if (value && value.length == 2) result[value[0].toLowerCase()] = unescape(value[1])
				}
				return result
			},
			audioRun: function(index, autoPlay) {
                if (index < -2 || index >= this.elemLength) return;
				var nextItem;
				if (index == -2) nextItem = this.currentItem <= 0 ? this.elemLength - 1 : this.currentItem - 1;
				else if (index == -1) nextItem = this.currentItem >= this.elemLength - 1 ? 0 : this.currentItem + 1;
				else nextItem = index;
				this.container.trigger("amazingaudioplayer.switched", {
					previous: this.currentItem,
					current: nextItem
				});
                
                this.currentItem = nextItem;
				this.container.trigger("amazingaudioplayer.updateinfo", this.elemArray[this.currentItem]);
				this.audioPlayer.load(this.elemArray[this.currentItem]);
				if (autoPlay) this.playAudio()
			},
			onAudioEnded: function() {
				this.container.trigger("amazingaudioplayer.ended", this.currentItem);
				switch (this.options.loop) {
				case 0:
					if (!this.options.noncontinous && this.currentItem < this.elemLength - 1) this.audioRun(-1, true);
					else this.stopAudio();
					break;
				case 1:
					this.audioRun(-1, true);
					break;
				case 2:
					this.audioRun(this.currentItem, true);
					break
				}
			},
			playAudio: function() {
				this.audioPlayer.play();
				this.container.trigger("amazingaudioplayer.played", this.currentItem);
				if (this.options.stopotherplayers) if (amazingAudioPlayerObjects && amazingAudioPlayerObjects.objects) for (var i = 0; i < amazingAudioPlayerObjects.objects.length; i++) {
					if (amazingAudioPlayerObjects.objects[i].id == this.id) continue;
					amazingAudioPlayerObjects.objects[i].container.trigger("amazingaudioplayer.stop", this.id)
				}
			},
			pauseAudio: function() {
				this.audioPlayer.pause();
				this.container.trigger("amazingaudioplayer.paused", this.currentItem)
			},
			stopAudio: function() {
				this.audioPlayer.stop();
				this.container.trigger("amazingaudioplayer.stopped", this.currentItem);
				this.container.trigger("amazingaudioplayer.playprogress", {
					current: 0,
					duration: 0,
					live: this.elemArray[this.currentItem].live
				})
			},
			setVolume: function(volume) {
				this.audioPlayer.setVolume(volume);
				this.container.trigger("amazingaudioplayer.setvolume", volume)
			},
			loadProgress: function(progress) {
				this.container.trigger("amazingaudioplayer.loadprogress", progress)
			},
			playProgress: function(current, duration) {
				if (current == 0 && duration == 1E5) return;
				var d0 = this.elemArray[this.currentItem].duration * 1E3 > duration || isNaN(duration) || !isFinite(duration) ? this.elemArray[this.currentItem].duration * 1E3 : duration;
				this.container.trigger("amazingaudioplayer.playprogress", {
					current: current,
					duration: d0,
					live: this.elemArray[this.currentItem].live
				})
			},
			setTime: function(pos) {
				this.audioPlayer.setTime(pos, this.elemArray[this.currentItem].duration)
			}
		};
		var bts = function(string) {
			var ret = "";
			var bytes = string.split(",");
			for (var i = 0; i < bytes.length; i++) ret += String.fromCharCode(bytes[i]);
			return ret
		};
		options = options || {};
		for (var key in options) if (key.toLowerCase() !== key) {
			options[key.toLowerCase()] = options[key];
			delete options[key]
		}
		this.each(function() {
			if ($(this).data("donotinit") && (!options || !options["forceinit"])) return;
			if ($(this).data("inited")) return;
			$(this).data("inited", 1);
			this.options = $.extend({}, options);
			//this.options.fvm = bts("97,109,97,122,105,110,103,97,117,100,105,111,112,108,97,121,101,114,46,99,111,109");
			if ($(this).data("skin") && typeof AMAZINGAUDIOPLAYER_SKIN_OPTIONS !== "undefined") if ($(this).data("skin") in AMAZINGAUDIOPLAYER_SKIN_OPTIONS) this.options = $.extend({}, AMAZINGAUDIOPLAYER_SKIN_OPTIONS[$(this).data("skin")], this.options);
			var instance = this;
			$.each($(this).data(), function(key, value) {
				instance.options[key.toLowerCase()] = value
			});
			if (typeof amazingaudioplayer_options != "undefined" && amazingaudioplayer_options) this.options = $.extend(this.options, amazingaudioplayer_options);
			if ($("div#amazingaudioplayer_options").length) $.each($("div#amazingaudioplayer_options").data(), function(key, value) {
				instance.options[key.toLowerCase()] = value
			});
			var searchoptions = {};
			var searchstring = window.location.search.substring(1).split("&");
			for (var i = 0; i < searchstring.length; i++) {
				var keyvalue = searchstring[i].split("=");
				if (keyvalue && keyvalue.length == 2) {
					var key = keyvalue[0].toLowerCase();
					var value =
					unescape(keyvalue[1]).toLowerCase();
					if (value == "true") searchoptions[key] = true;
					else if (value == "false") searchoptions[key] = false;
					else searchoptions[key] = value
				}
			}
			//this.options = $.extend(this.options, searchoptions);
			//this.options.lvm = bts("104,116,116,112,58,47,47,97,109,97,122,105,110,103,97,117,100,105,111,112,108,97,121,101,114,46,99,111,109");
			var defaultOptions = {
				autoplay: false,
				loop: 1,
                showloop:true,
				width: 200,
				random: true,
				autoplaytimeout: 1E3,
				stopotherplayers: true,
				forcefirefoxflash: false,
				forcechromeflash: false,
				forceflash: false,
				forcehtml5: false,
				stoponpausebutton: false,
				noncontinous: false,
				preloadaudio: true,
				defaultvolume: -1,
				skinsfoldername: "",
				playpauseimage: "playpause-28-28-0.png",
				playpauseimagewidth: 28,
				playpauseimageheight: 28,
				showstop: true,
				stopimage: "stop-32-32-0.png",
				stopimagewidth: 32,
				stopimageheight: 32,
				showprevnext: true,
				prevnextimage: "prevnext-32-32-0.png",
				prevnextimagewidth: 32,
				prevnextimageheight: 32,
				showprogress: true,
				progressheight: 20,
				showtime: true,
				timeformat: "%CURRENT% / %DURATION%",
				timeformatlive: "%CURRENT% / LIVE",
				showloading: false,
				loadingformat: "Loading...",
				showvolume: true,
				showvolumebar: true,
				volumeimage: "volume-32-32-0.png",
				volumeimagewidth: 24,
				volumeimageheight: 24,
				volumebarpadding: 6,
				volumebarheight: 100
			};
			this.options = $.extend(defaultOptions, this.options);
			this.options.htmlfolder = window.location.href.substr(0, window.location.href.lastIndexOf("/") + 1);
			this.options.skinsfolder = this.options.jsfolder;
			if (this.options.skinsfoldername.length > 0) this.options.skinsfolder += this.options.skinsfoldername;
			if (this.options.skinsfolder.length > 0 && this.options.skinsfolder[this.options.skinsfolder.length - 1] != "/") this.options.skinsfolder += "/";
			//this.options.addwm = this.options.vm != bts("65,77,67,111,109");
			var audioplayerid;
			if ("audioplayerid" in this.options) audioplayerid = this.options.audioplayerid;
			else {
				audioplayerid = amazingaudioplayerId;
				amazingaudioplayerId++
			}
			var object = new AmazingAudioPlayer($(this), this.options, audioplayerid);
			$(this).data("object", object);
			$(this).data("id", audioplayerid);
			amazingAudioPlayerObjects.addObject(object)
		})
	}
})(jQuery);
if (typeof amazingaudioplayerId === "undefined") var amazingaudioplayerId = 0;
if (typeof amazingAudioPlayerObjects === "undefined") var amazingAudioPlayerObjects = new
function() {
	this.objects = [];
	this.addObject = function(obj) {
		this.objects.push(obj)
	}
};