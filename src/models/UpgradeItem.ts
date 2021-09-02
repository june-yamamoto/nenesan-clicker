type UnlockConditionType = 'ClickTimes' | 'SpecificItemBuildTimes';

type UpgradeItemType = {
    id: string;
    name: string;
    flavor: string;
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
    price: number;
    purchased: boolean;
    unlockCondition: UnlockConditionType;
    magnification: number;

    constructor(props: UpgradeItemType) {
        this.id = props.id;
        this.name = props.name;
        this.flavor = props.flavor;
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
        flavor: 'ガンダムビルドダイバーズの登場キャラであり、ねねさんが演じた最初のアニメメインキャラクター。クリック時のねねさんの増加量を2倍にする。',
        price: 10000,
        unlockCondition: 'ClickTimes',
        magnification: 2,
        unlockClickTimes: 100,
    },
    {
        id: 'misa',
        name: 'ミサ・イリオローグ',
        flavor: '魔王学院の不適合者～史上最強の魔王の始祖、転生して子孫たちの学校へ通う～の登場キャラであり、ねねさんが演じている。クリック時のねねさんの増加量を2倍にする。',
        price: 500000,
        unlockCondition: 'ClickTimes',
        magnification: 2,
        unlockClickTimes: 1000,
    },
    {
        id: 'miyako',
        name: '六車宮古',
        flavor: '戦翼のシグルドリーヴァの登場キャラであり、ねねさんが演じている。クリック時のねねさんの増加量を2倍にする。',
        price: 1000000,
        unlockCondition: 'ClickTimes',
        magnification: 2,
        unlockClickTimes: 10000,
    },
    {
        id: 'yuzu',
        name: '泉優鈴',
        flavor: '弱キャラ友崎くんの登場キャラであり、ねねさんが演じている。クリック時のねねさんの増加量を2倍にする。',
        price: 10000000,
        unlockCondition: 'ClickTimes',
        magnification: 2,
        unlockClickTimes: 50000,
    },
    {
        id: 'ponta',
        name: 'ポンタ',
        flavor: '骸骨騎士様、只今異世界へお出掛け中の登場キャラであり、ねねさんが演じている。尚、アニメの放送時期は2021年8月現在未定。クリック時のねねさんの増加量を2倍にする',
        price: 50000000,
        unlockCondition: 'ClickTimes',
        magnification: 2,
        unlockClickTimes: 100000,
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
        price: 5000000000,
        unlockCondition: 'SpecificItemBuildTimes',
        magnification: 2,
        specificItemId: 'koko',
        unlockBuildTimes: 25,
    },
];

export const DefaultUpgradeItems = upgradeBuildItems.concat(upgradeClickItems);
