const config = require("../config");
const mdb = require("moviedb")(config.TMDB_KEY);

function search(query) {
  return new Promise((resolve, reject) => {
    mdb.searchMovie({ query }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function imagify(path, size = "w500") {
  return `https://image.tmdb.org/t/p/${size}/${path}`;
}

function normalize(results) {
  return {
    results: results
      .filter(e => {
        return e.adult == false;
      })
      .map(el => {
        return {
          id: el.id,
          src: imagify(el.poster_path),
          backdrop_src: imagify(el.backdrop_path),
          title: el.title,
          description: el.overview
        };
      })
  };
}

function example() {
  return Promise.resolve(normalize({
    page: 1,
    total_results: 80,
    total_pages: 4,
    results: [
      {
        vote_count: 3,
        id: 212262,
        video: false,
        vote_average: 3.5,
        title: "Kamen Rider W Returns: Kamen Rider Eternal",
        popularity: 2.613323,
        poster_path: "/dQRIcE4v1BeqJkkUmyV7HnIPVjX.jpg",
        original_language: "ja",
        original_title: "仮面ライダーＷ（ダブル）　ＲＥＴＵＲＮＳ　仮面ライダーエターナル",
        genre_ids: [28, 12, 878],
        backdrop_path: "/5VO5ZxB0eWkiih1lNOnaz5mj9uS.jpg",
        adult: false,
        overview:
          "After taking out a Sweets Dopant, Kamen Rider Double encounters a strange woman who tries to kill the two-in-one Kamen Rider with her psychic powers to avenge Katsumi Daido, the man who almost destroyed Futo and defeated by Double. Assuming LunaMetal to restrain her, Shotaro and Philip demand answers on why she would avenge the death of a terrorist. However, upon revealing a harmonica that was his, the psychic reveals that Daido was actually a hero before playing it. She then proceeds to tell the story of Katsumi Daido.",
        release_date: "2011-07-21"
      },
      {
        vote_count: 8,
        id: 41104,
        video: false,
        vote_average: 5.9,
        title: "Kamen Rider - The First",
        popularity: 1.913435,
        poster_path: "/wgWZbKBUkkM6KOj6ZbkmrnWYHSh.jpg",
        original_language: "ja",
        original_title: "仮面ライダー THE FIRST",
        genre_ids: [28, 12, 878, 53],
        backdrop_path: "/epNaEtm0mmOSom5rDeOHXWfLnIv.jpg",
        adult: false,
        overview:
          "Takeshi Hongo, a man of extraordinarily keen intellect, has his promising future snuffed out by an evil secret society known as Shocker. They create experimental cyborgs in an attempt to take over the world. Eventually, Hongo is turned into a cyborg — Masked Rider 1 — but soon regains his self-awareness. Realizing that he is now controlled by evil, Hongo escapes. Shocker views Hongo as a traitor and dispatches a new, nearly identical cyborg — Masked Rider 2 — to destroy him. But they're too evenly matched and their duel ends in a draw. Growing impatient, Shocker sends two new cyborgs — Snake and Cobra — to kill them both. KAMEN RIDER THE FIRST is a new adaptation of the popular original manga created by Shotaro Ishinomori.",
        release_date: "2005-12-05"
      },
      {
        vote_count: 3,
        id: 212258,
        video: false,
        vote_average: 3.5,
        title: "Kamen Rider W Returns: Kamen Rider Accel",
        popularity: 1.607925,
        poster_path: "/hR8PycWt8wYQcfttD9xqjq3JwHE.jpg",
        original_language: "ja",
        original_title: "仮面ライダーＷ（ダブル）　ＲＥＴＵＲＮＳ　仮面ライダーアクセル",
        genre_ids: [28, 12, 878],
        backdrop_path: "/rDjF7KWGu2ZpK3WFYc1r526CfBZ.jpg",
        adult: false,
        overview:
          "Kamen Rider Accel continues his journey protecting the city of Fuuto. Kamen Rider Accel is a story set after the events of Kamen Rider × Kamen Rider OOO &amp; W Featuring Skull: Movie War Core.",
        release_date: "2011-04-21"
      },
      {
        vote_count: 1,
        id: 271783,
        video: false,
        vote_average: 2,
        title: "Kamen Rider G",
        popularity: 1.736529,
        poster_path: "/8qoRIfoaH3d7OyBRMLEEuRKdLwM.jpg",
        original_language: "ja",
        original_title: "仮面ライダーG",
        genre_ids: [28, 878, 35],
        backdrop_path: "/3mNqbBEC1T55MXMDf2LZ3k01tYG.jpg",
        adult: false,
        overview:
          "Goro is a sommelier who transforms into the titular Kamen Rider G to fight the former anti-terrorism unit Shade, who captured and brainwashed him into a soldier, before the unit went underground due to the use of kidnapped people as supersoldiers. During a raid at TV Asahi led by Daidō Oda, who demands the release of their imprisoned leader, Seizan Tokugawa, Goro encounters his girlfriend Eri Hinata. She jogs his memory and he attacks his former comrades while getting Eri out of harm's way. This makes Oda reveal his true form as the Phylloxera Worm while his subordinates transform into the Acarina Worm, the Subst Worm, the Brachypelma Worm Viridis, and the Cochlea Worm to attempt to destroy the traitor. After an extended fight across the city and countryside, G manages to defeat Phylloxera Worm thanks to the encouragement of Decade and the other primary Heisei Riders appearing before him. Running off, Goro vows to save the world from Shade before returning to Eri.",
        release_date: "2009-01-31"
      },
      {
        vote_count: 5,
        id: 187922,
        video: false,
        vote_average: 5.8,
        title: "Kamen Rider ZO",
        popularity: 1.426083,
        poster_path: "/sH5dLI5DXl8bKg2hITN3ayow3WE.jpg",
        original_language: "ja",
        original_title: "仮面ライダーZO",
        genre_ids: [28, 12, 878],
        backdrop_path: "/na2bR7RneTccHiPmCHKN3oAcHzn.jpg",
        adult: false,
        overview:
          "Researcher Asou Masaru and a slightly unbalanced scientist, Dr. Mochizuki are experimenting on the creation of a mysterious and vaguely threatening organism. Along the way, he pauses to create a human/locust cyborg out of Asou. Alarmed at his new form, the now ZO retreats to a nearby forest and hides away. In the meantime, Dr. Mochizuki has finished his work and the organism is set loose on an unprepared world. ZO returns to defend the deranged scientist's young son and the world in a series of battles.",
        release_date: "1993-04-17"
      },
      {
        vote_count: 0,
        id: 479363,
        video: false,
        vote_average: 0,
        title: "Kamen Rider Heisei Generations: FINAL",
        popularity: 2.026298,
        poster_path: "/1KjDohYwjfQu5pyeNaccOa2tZfO.jpg",
        original_language: "en",
        original_title: "仮面ライダー平成ジェネレーションズFINAL",
        genre_ids: [12, 28],
        backdrop_path: null,
        adult: false,
        overview:
          "Kamen Riders Build and Ex-Aid team up with the legendary heroes of the Heisei Generation - OOO, Fourze, Gaim, and Ghost.",
        release_date: "2017-12-09"
      },
      {
        vote_count: 0,
        id: 452519,
        video: false,
        vote_average: 0,
        title: "Kamen Rider Ex-Aid [Tricks] - Kamen Rider Lazer",
        popularity: 1.788367,
        poster_path: "/2kQ2sKnvR1FOxt0XtnwXgNZ3X29.jpg",
        original_language: "ja",
        original_title: "仮面ライダーエグゼイド [裏技] 仮面ライダーレーザー",
        genre_ids: [28, 12, 878],
        backdrop_path: "/5Vlp5gtlzxhOx6qaYQkyRJbqHSu.jpg",
        adult: false,
        overview:
          "Kamen Rider Ex-Aid [Tricks] - Kamen Rider Lazer is Hyper Battle DVD featuring characters from the Kamen Rider Ex-Aid television series.",
        release_date: "2017-06-01"
      },
      {
        vote_count: 3,
        id: 38973,
        video: false,
        vote_average: 6,
        title: "Kamen Rider Den-O: I'm Born!",
        popularity: 3.015182,
        poster_path: "/xbQHN7Y7SEfG8D69GtWhc20R41I.jpg",
        original_language: "ja",
        original_title: "劇場版 仮面ライダー電王 俺、誕生！",
        genre_ids: [878, 28, 12],
        backdrop_path: "/dkjUUHNRuBmQeme3b7cio9RXyEY.jpg",
        adult: false,
        overview:
          "Ryotaro pursues the Molech Imagin to May 8, 2000. Though Den-O Sword Form destroys the Molech Imagin, the Imagin fulfilled his mission as the DenLiner ends up hijacked by the rest of the Imagin led by a rogue Kamen Rider named Gaoh. After stealing Owner's Master Pass and trapping Urataros and Kintaros, Gaoh forces the DenLiner to travel back in time via \"God's Line\" to the Edo Period of Japan so he can retrieve the legendary God's Train, the GaohLiner.",
        release_date: "2007-08-04"
      },
      {
        vote_count: 0,
        id: 436678,
        video: false,
        vote_average: 0,
        title: "Kamen Rider Drive Saga: Kamen Rider Mach / Kamen Rider Heart",
        popularity: 1.108871,
        poster_path: "/wOf23nbxxuinu7l9FSo3L6G4aZI.jpg",
        original_language: "ja",
        original_title: "ドライブサーガ　仮面ライダーマッハ／仮面ライダーハート",
        genre_ids: [878, 28, 12],
        backdrop_path: "/cbBUCQE5WJDXTSNRQKYzKg22XZD.jpg",
        adult: false,
        overview:
          'This twin V-Cinema movies contains the second and third installments after the initial Kamen Rider Drive Saga: Kamen Rider Chaser, they both follow the characters of both Heart and Go Shijima beyond the conclusion of the series. Heart/Mach both take place following the novel, "Kamen Rider Drive: ~Mach Saga~", which takes place two years following the conclusion of the Kamen Rider Drive TV series.',
        release_date: "2016-11-16"
      },
      {
        vote_count: 3,
        id: 194777,
        video: false,
        vote_average: 3,
        title: "Shin Kamen Rider: Prologue",
        popularity: 1.222138,
        poster_path: "/clMuWMlrJXwR8DRzPZeU4tKa3ie.jpg",
        original_language: "en",
        original_title: "真・仮面ライダー 序章(プロローグ",
        genre_ids: [28, 12, 878],
        backdrop_path: "/k6QgIguNFKKPgn6lP6nPo2aUXAI.jpg",
        adult: false,
        overview:
          "Doctors Kazamatsuri and Onizuka are geneticists researching cures on diseases such as AIDS and cancer by performing experiments to strengthen the human body. The test subject is Shin Kazamatsuri, motorcycle racer son of Doctor Kazamatsuri. Unknown to them, their operation is funded by a syndicate group, who plan to use this research to have the bodies of men strengthened for their own gain—they have already been experimenting in the field of cyborg soldiers, to a less-than-successful attempt. However, they did not count on Onizuka's own secret ambitions; the mad Onizuka wanted to create a new species, by fusing a grasshopper's DNA with the test subject's, in order to start a new civilization and be their god. He has tested on himself, but seems to be having greater success with Shin.",
        release_date: "1992-02-20"
      },
      {
        vote_count: 0,
        id: 437440,
        video: false,
        vote_average: 0,
        title: "Kamen Rider Ghost RE:BIRTH - Kamen Rider Specter",
        popularity: 1.199721,
        poster_path: "/vT5IVAqGqBR9kQEQbHCliULml3v.jpg",
        original_language: "ja",
        original_title: "仮面ライダーゴースト RE:BIRTH 仮面ライダースペクター",
        genre_ids: [878, 28, 12],
        backdrop_path: "/vcD9erigtkX2Br8MRm4UkuVZmsG.jpg",
        adult: false,
        overview:
          "A continuation from the Kamen Rider Ghost TV series, this is the story of Makoto, Alain, and Kanon who have traveled back to the Ganma World. It will explain the connection between Makoto and the Makoto doppelganger. Kanon’s secret will be revealed as well.",
        release_date: "2017-04-19"
      },
      {
        vote_count: 2,
        id: 187937,
        video: false,
        vote_average: 4.3,
        title: "Kamen Rider World",
        popularity: 1.163729,
        poster_path: "/leJuvlKrblFSfj7xc58Odp9LRsE.jpg",
        original_language: "en",
        original_title: "仮面ライダーワールド",
        genre_ids: [878, 28, 12],
        backdrop_path: "/vVyqjlhAXq0rDKiGNeWFFTDaqzg.jpg",
        adult: false,
        overview:
          "Kamen Rider World is a short 3-D film produced by Toei Company based on the Kamen Rider Series that premiered on August 6, 1994 and was shown in amusement parks and special events nationwide in Japan. It was shown as a triple feature alongside Super Sentai World and Toei Hero Daishugō (a crossover between Tokusou Robo Janperson and Blue Swat which also used footage from Super Sentai World).",
        release_date: "1994-08-06"
      },
      {
        vote_count: 3,
        id: 108515,
        video: false,
        vote_average: 3.8,
        title: "Kamen Rider × Kamen Rider W & Decade: Movie War 2010",
        popularity: 2.229154,
        poster_path: "/iEUN4Ky01nFMjJjBUW6BAIac6Ng.jpg",
        original_language: "ja",
        original_title: "仮面ライダー×仮面ライダー Ｗ（ダブル）＆ディケイド MOVIE大戦2010",
        genre_ids: [28, 12, 878],
        backdrop_path: "/fMeFS7Lt1Pw1xsM6i65V33nh5vz.jpg",
        adult: false,
        overview:
          'Movie War 2010 is split into three parts. The Kamen Rider Decade portion of the film, written by Shoji Yonemura, is titled Kamen Rider Decade: The Last Story. It follows the series cliffhanger ending at the climax of the Rider War. The film is billed as the "True Ending" and was originally subtitled Decade vs. All Riders.  The Kamen Rider W portion of the film, written by Riku Sanjo, is titled Kamen Rider W: Begins Night, taking place between episodes 14 and 15 of Kamen Rider W, investigates the origins of Kamen Rider Double as briefly shown in the cold opening of the series\' first episode, referred to in the series as the "Begins Night". The film is described as the "True Beginning" and was originally subtitled Episode Zero.  In the final portion of the film entitled Movie War 2010, a convergence of the two films that brings the casts and characters of Decade and W to finish the fight with Super Shocker together.',
        release_date: "2009-12-12"
      },
      {
        vote_count: 0,
        id: 402073,
        video: false,
        vote_average: 0,
        title: "Kamen Rider Drive Saga: Kamen Rider Chaser",
        popularity: 1.04869,
        poster_path: "/43aM2CG3NsTMWGYBpAUie5W9DMq.jpg",
        original_language: "ja",
        original_title: "ドライブサーガ　仮面ライダーチェイサー",
        genre_ids: [28, 12, 878],
        backdrop_path: "/8XCW48sSsZuxswTQPgvrk8U0jMn.jpg",
        adult: false,
        overview:
          "A new Roidmude, Angel, appears, granting full human emotions to Chase. Chase, now possessing the emotions he wanted to feel, attempts to integrate into humanity, but becomes uncertain when he realizes the dangers of what the Angel Roidmude is doing. Chase must decide between Justice and the emotions he always wanted, with the lives of those around him at stake.",
        release_date: "2016-04-20"
      },
      {
        vote_count: 0,
        id: 457331,
        video: false,
        vote_average: 0,
        title: "Kamen Rider Ex-Aid: True Ending",
        popularity: 1.453985,
        poster_path: "/mtvG7mTnrCti4t2oXmQcKJV0F0Q.jpg",
        original_language: "ja",
        original_title: "Kamen Rider Ex-Aid: True Ending",
        genre_ids: [878, 28, 12],
        backdrop_path: null,
        adult: false,
        overview:
          "A year after defeating Masamune (Kamen Rider Cronus), Emu Hojo and the Doctor Riders venture into the VR Game World to deal with a new Game Disease outbreak hitting Tokyo.",
        release_date: "2017-08-05"
      },
      {
        vote_count: 3,
        id: 185958,
        video: false,
        vote_average: 4.8,
        title: "Kamen Rider J",
        popularity: 1.13549,
        poster_path: "/cxqybvEPJahIeWVrPYHHeGzJltZ.jpg",
        original_language: "ja",
        original_title: "仮面ライダーJ",
        genre_ids: [28, 12, 878],
        backdrop_path: "/5qiwWY2gjyo7haidJjIHO8KhBsD.jpg",
        adult: false,
        overview:
          'The story begins with three Aliens in human form preparing for a ritual to feed the Fog Mother\'s "siblings". The Fog Mother last came to earth during the Prehistoric Age and is the cause of the extinction of the dinosaurs. Kenji (KR J) and his kid sister are in the mountains, Kenji is investigating all the deaths of animals and trees there. The Fog Mother sends the three aliens, "Prince Gorai", "Zoo", and "Agito" to kidnap Kenji\'s baby sister for the sacrifice. During the course, "Agito" punches through Kenji\'s stomach and plunges to his death. Or did he?',
        release_date: "1994-04-16"
      },
      {
        vote_count: 4,
        id: 204634,
        video: false,
        vote_average: 2.8,
        title: "Kamen Rider × Kamen Rider Wizard & Fourze: Movie War Ultimatum",
        popularity: 2.834266,
        poster_path: "/j3ahE1k9yfTfTo8fRLD3zIE84tI.jpg",
        original_language: "ja",
        original_title: "仮面ライダー×仮面ライダー ウィザード&フォーゼ MOVIE大戦アルティメイタム",
        genre_ids: [28, 12, 878],
        backdrop_path: "/tXy6wSbcZiTxCv37XyxHpRF1Yzi.jpg",
        adult: false,
        overview:
          "The first part is the Kamen Rider Fourze’s place five years after the events of the series. Gentaro is now a teacher at Amanogawa High as well as the Space Kamen Rider Club’s new academic advisor. However, a new school club called the Monster League, comprised by a group of psychic children led by Saburo Kazeta, which is supported by a mysterious man named Kageto Banba. The second part is Kamen Rider Wizard’s portion, where Haruto enters the Underworld of an unknown Gate to investigate the mysterious occurrings of monster appearances. He then runs into a young woman named Yu Kamimura who can become Belle Mask Poitrine and can use magic like him. The third and final part of the film is Movie War Ultimatum. The three Akumaizer from the Underworld to plan to invade the land of the living. Kamen Riders Wizard and Fourze must fight to stop the Akumaizer and their Monster Army.",
        release_date: "2012-12-08"
      },
      {
        vote_count: 0,
        id: 266539,
        video: false,
        vote_average: 0,
        title: "Kamen Rider Amazon",
        popularity: 1.000011,
        poster_path: "/ac6zbhrm30r7rNbqz7F1295Q2HI.jpg",
        original_language: "ja",
        original_title: "仮面ライダーアマゾン",
        genre_ids: [27, 28, 12, 878],
        backdrop_path: "/9EaXjbYTFNo0HRYQQedXxEZk2fp.jpg",
        adult: false,
        overview:
          "The Kamen Rider Amazon movie is a theatrical version of episode 16, Garander's Tokyo Sea of Flames Operation!!, depicting Gengoro Beastman's attempt to execute Garanda's Tokyo Sea of Flame plan.",
        release_date: "1975-03-21"
      },
      {
        vote_count: 5,
        id: 167693,
        video: false,
        vote_average: 3.9,
        title: "Kamen Rider Fourze the Movie: Space, Here We Come!",
        popularity: 2.469101,
        poster_path: "/uWN90oKqOVryC9UmM9rMkwXPIEP.jpg",
        original_language: "en",
        original_title: "仮面ライダーフォーゼ THE MOVIE みんなで宇宙キターッ!",
        genre_ids: [28, 12, 878],
        backdrop_path: "/u1EQEMyTiid5f1lTFqTnLqZXf4p.jpg",
        adult: false,
        overview:
          "The Earth is threatened by the mysterious Space Ironmen brothers, and the Kamen Rider Club goes to the space to avoid them to be awakened. However, an agent of the  Alicia Federation, Inga Blink, tries to stop them. Kamen Rider Forze and Meteor fight for the destiny of the Earth and for the friendship of all beings.",
        release_date: "2012-08-04"
      },
      {
        vote_count: 1,
        id: 434559,
        video: false,
        vote_average: 10,
        title: "Kamen Rider SD: Strange?! Kumo Otoko",
        popularity: 1.083345,
        poster_path: "/qhW8dwIAL7JMoJrOn2Ok6ZdiilZ.jpg",
        original_language: "ja",
        original_title: "仮面ライダーSD 怪奇!?クモ男",
        genre_ids: [16, 35, 878],
        backdrop_path: "/fVTfbIhYaH40cB6skUx6D7HaSfI.jpg",
        adult: false,
        overview:
          '"Kamen Rider SD: Strange!? Kumo Otoko" is an animated OVA based on the gag manga Kamen Rider SD: Hurricane Legend. This cute and comedic short movie features chibi versions of the Showa Era Kamen Riders, as they team up against the evil GranShocker organization , while Kamen Rider Black RX tries to confess his love to female sports instructor Michiru.',
        release_date: "1993-01-24"
      }
    ]
  }));
}

export default {
  search,
  example
};
