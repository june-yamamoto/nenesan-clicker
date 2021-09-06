type UnlockConditionType = 'ClickTimes' | 'SpecificItemBuildTimes';

type UpgradeItemType = {
    id: string;
    name: string;
    flavor: string;
    link?: string;
    price: number;
    purchased?: boolean;
    unlockCondition: UnlockConditionType;
    magnification: number;
    unlockClickTimes?: number;
    specificItemId?: string;
    unlockBuildTimes?: number;
};

export type UpgradeItemClasses = ClickUpgradeItem | ItemUpgradeItem;

export function UpgradeItemBuilder(props: UpgradeItemType): UpgradeItemClasses {
    switch (props.unlockCondition) {
        case 'ClickTimes':
            return new ClickUpgradeItem(props);
        case 'SpecificItemBuildTimes':
            return new ItemUpgradeItem(props);
        default:
            throw new Error();
    }
}

class UpgradeItem {
    id: string;
    name: string;
    flavor: string;
    link: string;
    price: number;
    purchased: boolean;
    unlockCondition: UnlockConditionType;
    magnification: number;

    constructor(props: UpgradeItemType) {
        this.id = props.id;
        this.name = props.name;
        this.flavor = props.flavor;
        this.link = props.link || '';
        this.price = props.price;
        this.purchased = props.purchased || false;
        this.unlockCondition = props.unlockCondition;
        this.magnification = props.magnification;
    }

    purchase() {
        if (this.purchased) return;
        this.purchased = true;
    }
}

export class ClickUpgradeItem extends UpgradeItem {
    unlockClickTimes: number;

    constructor(props: UpgradeItemType) {
        super(props);
        this.unlockClickTimes = props.unlockClickTimes || 0;
    }
}

export class ItemUpgradeItem extends UpgradeItem {
    specificItemId: string;
    unlockBuildTimes: number;

    constructor(props: UpgradeItemType) {
        super(props);
        this.specificItemId = props.specificItemId || '';
        this.unlockBuildTimes = props.unlockBuildTimes || 0;
    }
}

const upgradeClickItems: UpgradeItemType[] = [
    {
        id: 'momoka',
        name: 'ヤシロ・モモカ',
        flavor: '「ガンダムビルドダイバーズ」の登場キャラであり、ねねさんが演じた最初のアニメメインキャラクター。クリック時のねねさんの増加量を2倍にする。',
        link: 'http://gundam-bd.net/2016/',
        price: 10000,
        unlockCondition: 'ClickTimes',
        magnification: 2,
        unlockClickTimes: 100,
    },
    {
        id: 'maika',
        name: '鷹取 舞花',
        flavor: 'スマートフォン向け新人声優育成ゲーム「CUE!」の登場キャラであり、ねねさんが演じている。尚、2021年9月現在ゲームはサービス終了済みである。「目指せ、ナンバーワン声優！自分にかかれば、世界一だって夢じゃない！」クリック時のねねさんの増加量を2倍にする。',
        link: 'https://www.cue-liber.jp/character-02',
        price: 100000,
        unlockCondition: 'ClickTimes',
        magnification: 2,
        unlockClickTimes: 500,
    },
    {
        id: 'misa',
        name: 'ミサ・イリオローグ',
        flavor: '「魔王学院の不適合者～史上最強の魔王の始祖、転生して子孫たちの学校へ通う～」の登場キャラであり、ねねさんが演じている。クリック時のねねさんの増加量を2倍にする。',
        link: 'https://maohgakuin.com/1st/',
        price: 500000,
        unlockCondition: 'ClickTimes',
        magnification: 2,
        unlockClickTimes: 1000,
    },
    {
        id: 'miyako',
        name: '六車宮古',
        flavor: '「戦翼のシグルドリーヴァ」の登場キャラであり、ねねさんが演じている。クリック時のねねさんの増加量を3倍にする。',
        link: 'https://sigururi.com/',
        price: 1000000,
        unlockCondition: 'ClickTimes',
        magnification: 3,
        unlockClickTimes: 10000,
    },
    {
        id: 'yuzu',
        name: '泉優鈴',
        flavor: '「弱キャラ友崎くん」の登場キャラであり、ねねさんが演じている。クリック時のねねさんの増加量を3倍にする。',
        link: 'http://tomozaki-koushiki.com/',
        price: 10000000,
        unlockCondition: 'ClickTimes',
        magnification: 3,
        unlockClickTimes: 50000,
    },
    {
        id: 'ponta',
        name: 'ポンタ',
        flavor: '「骸骨騎士様、只今異世界へお出掛け中」の登場キャラであり、ねねさんが演じている。通称、「綿毛狐」。尚、アニメの放送時期は2021年8月現在未定。クリック時のねねさんの増加量を3倍にする',
        link: 'https://skeleton-knight.com/',
        price: 50000000,
        unlockCondition: 'ClickTimes',
        magnification: 3,
        unlockClickTimes: 100000,
    },
    {
        id: 'watashi',
        name: 'わたし',
        flavor: '「人類は衰退しました」の登場キャラであり、オーディオブック版の朗読にてねねさんが朗読を行っている。アニメ版のCVは中原麻衣さん。2019年の発売であるため、初々しいねねさんの演技を見ることができる。クリック時のねねさんの増加量を4倍にする',
        link: 'https://www.audible.co.jp/series/%E4%BA%BA%E9%A1%9E%E3%81%AF%E8%A1%B0%E9%80%80%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA/B086KZQQV7',
        price: 100000000,
        unlockCondition: 'ClickTimes',
        magnification: 4,
        unlockClickTimes: 150000,
    },
    {
        id: 'koharu',
        name: '佐藤こはる',
        flavor: '「塩対応の佐藤さんが俺にだけ甘い」の登場キャラであり、オーディオブック版の朗読にてねねさんが朗読を行っている。クリック時のねねさんの増加量を4倍にする',
        link: 'https://www.audible.co.jp/pd/%E5%A1%A9%E5%AF%BE%E5%BF%9C%E3%81%AE%E4%BD%90%E8%97%A4%E3%81%95%E3%82%93%E3%81%8C%E4%BF%BA%E3%81%AB%E3%81%A0%E3%81%91%E7%94%98%E3%81%84-%E3%82%AA%E3%83%BC%E3%83%87%E3%82%A3%E3%82%AA%E3%83%96%E3%83%83%E3%82%AF/B08R35NJWY?qid=1630939774&sr=1-1&ref=f=a_search_c3_lProduct_1_1&pf_rd_p=051ed80d-7075-4d26-8156-6887bfda8699&pf_rd_r=ACMH4H87N6MZ3FT2R7DV',
        price: 1000000000,
        unlockCondition: 'ClickTimes',
        magnification: 4,
        unlockClickTimes: 200000,
    },
    {
        id: 'misaki',
        name: '神宮寺美咲',
        flavor: '「恋は世界征服のあとで」の登場キャラであり、ねねさんが演じている。2022年1月からアニメ放送開始予定。正義の味方、氷結戦隊ジェラート５の一人、命の戦士、イエロージェラート。クリック時のねねさんの増加量を4倍にする',
        link: 'https://koiseka-anime.com/',
        price: 10000000000,
        unlockCondition: 'ClickTimes',
        magnification: 4,
        unlockClickTimes: 250000,
    },
    {
        id: 'douki',
        name: '同期ちゃん',
        flavor: '「がんばれ同期ちゃん」の登場キャラであり、ねねさんが演じている。2021年9月20日からAbemaTVにて放送開始。クリック時のねねさんの増加量を4倍にする',
        link: 'https://doukichan-anime.com/',
        price: 50000000000,
        unlockCondition: 'ClickTimes',
        magnification: 4,
        unlockClickTimes: 300000,
    },
];

const upgradeBuildItems: UpgradeItemType[] = [
    {
        id: 'glass',
        name: '眼鏡',
        flavor: '小峰愛未さんがFF衣装で掛けている眼鏡、下半分しかフレームがない。CUE!1st Partyの際にこの眼鏡を稗田寧々さんに掛けさせている。こみねえが生産するねねさんを2倍にする。',
        price: 1000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'komine',
        unlockBuildTimes: 10,
    },
    {
        id: 'soundOrion',
        name: 'サンドリオン',
        flavor: 'スターダストプロモーション声優部所属の新人声優で構成されたユニット。小峰愛未さんも所属している。こみねえが生産するねねさんを2倍にする。',
        link: 'https://www.soundorion.com/',
        price: 10000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'komine',
        unlockBuildTimes: 25,
    },
    {
        id: 'kaidan',
        name: '怪談',
        flavor: '稗田寧々さんは怖い話が苦手である。詳細については「稗田・宮原の自由奔放やりたい放題」第7回を参照。こみねえが生産するねねさんを4倍にする。',
        link: 'https://www.nicovideo.jp/watch/so39090405',
        price: 5000000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 4,
        specificItemId: 'komine',
        unlockBuildTimes: 50,
    },
    {
        id: 'osananajimi',
        name: '幼馴染',
        flavor: '天海由梨奈さんは稗田寧々さんの小学生の頃の同級生である。中学では離れたものの後に再開、二人共81プロデュース所属になるという奇跡のめぐり合わせが起きる。あまみが生産するねねさんを2倍にする。',
        price: 20000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'amami',
        unlockBuildTimes: 10,
    },
    {
        id: 'trueself',
        name: 'TRUE Self',
        flavor: '声優中島ヨシキ(ysk)がセルフプロデュースするアパレルブランド。定期的に新作のモデルと称して81プロデュースの後輩を着せかえ人形のようにこき使っている。稗田寧々さんと天海由梨奈さんは既にyskに食われている。あまみが生産するねねさんを2倍にする。',
        price: 500000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'amami',
        unlockBuildTimes: 25,
    },
    {
        id: '81produce',
        name: '81プロデュース',
        flavor: '声優事務所。稗田寧々さんと宮原颯希さんが所属する。前述の天海由梨奈さんも所属している。さっぴが生産するねねさんを2倍にする。',
        link: 'https://www.81produce.co.jp/',
        price: 100000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'miyahara',
        unlockBuildTimes: 10,
    },
    {
        id: 'zeitaku',
        name: '予算無いけど贅沢してみたい件',
        flavor: '稗田寧々さんと宮原颯希さんによる声優バラエティ番組。2019年10月から12月まで放送された。とても面白い。正式名称は「稗田・宮原の予算無いけど贅沢してみたい件!!」さっぴが生産するねねさんを2倍にする。',
        link: 'https://ch.nicovideo.jp/youdeallive',
        price: 2000000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'miyahara',
        unlockBuildTimes: 25,
    },
    {
        id: 'zokuzeitaku',
        name: '引き続き予算無いけど贅沢してみたい件',
        flavor: '稗田寧々さんと宮原颯希さんによる声優バラエティ番組。リニューアル前の「稗田・宮原の予算無いけど贅沢してみたい件」の最終回にて続編番組の配信が発表され、2020年1月から12月まで放送された。YOUDEALが他番組に手を広げ始めた影響により前番組に比べると物語性は薄れており、よくある声優バラエティ番組に落ち着いている。正式名称は「稗田・宮原の引き続き予算無いけど贅沢してみたい件!!!」さっぴが生産するねねさんを4倍にする。',
        link: 'https://ch.nicovideo.jp/youdeallive',
        price: 100000000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 4,
        specificItemId: 'miyahara',
        unlockBuildTimes: 50,
    },
    {
        id: 'koramai',
        name: 'コーラルマイク',
        flavor: '稗田寧々さんと鈴代紗弓さんによるラジオ番組。2020年5月からインターネットラジオステーション音泉にて隔週木曜日に配信中。「コラマイった、やー！」。おさゆが生産するねねさんを2倍にする。',
        link: 'https://www.onsen.ag/program/coral',
        price: 1000000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'suzushiro',
        unlockBuildTimes: 10,
    },
    {
        id: 'anosusama',
        name: 'アノス・ファンユニオン',
        flavor: '稗田寧々さんと鈴代紗弓さんは「魔王学院の不適合者～史上最強の魔王の始祖、転生して子孫たちの学校へ通う～」にて主人公アノス・ヴォルディゴードのファンクラブメンバーとして共演している。おさゆが生産するねねさんを2倍にする。',
        price: 50000000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'suzushiro',
        unlockBuildTimes: 25,
    },
    {
        id: 'nenecar',
        name: 'PUI PUI ネネカー',
        flavor: '稗田寧々さんと鈴代紗弓さんが初めてメインで共演した作品。パk)ryオマージュ元である「PUI PUI モルカー」の放送時期に合わせ、前述の「コーラルマイク」第15回からだいたい第17回まで放映された。また、第28回からは「劇場版PUI PUIネネカー」の上映に合わせて「PUI PUI ネネカー完結編」が放映されている。おさゆが生産するねねさんを4倍にする。',
        price: 600000000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 4,
        specificItemId: 'suzushiro',
        unlockBuildTimes: 50,
    },
    {
        id: 'rungirlsrun',
        name: "Run Girls, Run!",
        flavor: '林鼓子さん、森嶋優花さん、厚木那奈美さんの3名により構成される声優ユニット。はやまるが生産するねねさんを2倍にする。',
        link: 'https://rungirlsrun.jp/',
        price: 100000000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'koko',
        unlockBuildTimes: 10,
    },
    {
        id: 'namagaki',
        name: "生牡蠣",
        flavor: '稗田寧々さんは月1で食べたいと発言するほど生牡蠣が好きである。事務所の後輩である林鼓子さんを誘って生牡蠣を食べに行ったというエピソードは有名。はやまるが生産するねねさんを2倍にする。',
        price: 2000000000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'koko',
        unlockBuildTimes: 25,
    },
    {
        id: 'jk',
        name: "音泉女子高生",
        flavor: '林鼓子さんと白河みずなさんによるバラエティ番組。2019年6月からインターネットラジオステーション音泉のYouTubeチャンネルにて配信中。尚、放送開始時点でパーソナリティの2人は女子高生だったが2021年3月に林鼓子さんが高校を卒業したことで晴れて二人共女子高生ではなくなった。第73回、第74回に稗田寧々さんがゲスト出演しており、「スマホ写真ポーカー」「映画感想当てクイズ」を行った。はやまるが生産するねねさんを4倍にする。',
        link: 'https://www.youtube.com/watch?v=HWLRGp77xfM&list=PLOH-hjjr1nOrd3XK5hqnFsS9L0e4dR4OY&index=31',
        price: 50000000000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 4,
        specificItemId: 'koko',
        unlockBuildTimes: 50,
    },
];

export const DefaultUpgradeItems = upgradeBuildItems.concat(upgradeClickItems);
