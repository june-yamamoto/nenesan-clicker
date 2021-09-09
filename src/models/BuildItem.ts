export type BuildItemType = {
    id: string;
    name: string;
    flavor: string;
    basePrice: number;
    baseNenesanPerSeconds: number;
    itemHas?: number;
};

const PRICE_INCREASE_MAG = 1.12;

export class BuildItem {
    id: string;
    /** アイテム名 */
    name: string;
    /** アイテムのフレーバーテキスト */
    flavor: string;
    /** アイテムの基底価格 */
    basePrice: number;
    /** アイテムの所持数 */
    itemHas: number;
    /** 秒間何ねねさん？ */
    baseNenesanPerSeconds: number;

    constructor(props: BuildItemType) {
        this.id = props.id;
        this.name = props.name;
        this.flavor = props.flavor;
        this.basePrice = props.basePrice;
        this.baseNenesanPerSeconds = props.baseNenesanPerSeconds;
        this.itemHas = props.itemHas || 0;
    }

    purchase(): void {
        this.itemHas += 1;
    }

    get currentNenesanPerSeconds(): number {
        return this.baseNenesanPerSeconds;
    }

    get currentPrice(): number {
        return Math.ceil(this.basePrice * (PRICE_INCREASE_MAG ** this.itemHas));
    }
}

export const DefaultBuildItems: BuildItemType[] = [{
    id: 'komine',
    name: 'こみねえ',
    flavor: '小峰愛未。スターダストプロモーション所属。',
    basePrice: 20,
    baseNenesanPerSeconds: 0.1,
},{
    id: 'amami',
    name: 'あまみ',
    flavor: '天海由梨奈。81プロデュース所属。稗田寧々さんの後輩。',
    basePrice: 150,
    baseNenesanPerSeconds: 2,
}, {
    id: 'miyahara',
    name: 'さっぴ',
    flavor: '宮原颯希。81プロデュース所属。稗田寧々さんの後輩。',
    basePrice: 1000,
    baseNenesanPerSeconds: 15,
}, {
    id: 'suzushiro',
    name: 'おさゆ',
    flavor: '鈴代紗弓。アーツビジョン所属。',
    basePrice: 10000,
    baseNenesanPerSeconds: 200,
}, {
    id: 'koko',
    name: 'はやまる',
    flavor: '林鼓子。81プロデュース所属。稗田寧々さんの後輩。',
    basePrice: 800000,
    baseNenesanPerSeconds: 1000,
}, {
    id: 'asaka',
    name: '亜咲花',
    flavor: '亜咲花。アミュレート所属。女性シンガー、コスプレイヤー。名前の由来は「亜細亜に咲く花」。',
    basePrice: 240000000,
    baseNenesanPerSeconds: 12000,
}]