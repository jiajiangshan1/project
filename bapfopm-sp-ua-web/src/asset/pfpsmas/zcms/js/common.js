    /**
     * 清空子级以下的区划数据
     * @param {string} levelCode 本级级次代码
     * @param {*} codeRank 各级区划存放的数组对象
     */
     export let clearData = (levelCode, codeRank) => {
        switch (Number(levelCode)) {
            case 1:
                codeRank.city = codeRank.county = codeRank.township = codeRank.village = [];
                break;
            case 2:
                codeRank.county = codeRank.township = codeRank.village = [];
                break;
            case 3:
                codeRank.township = codeRank.village = [];
                break;
            case 4:
                codeRank.village = [];
                break;
            default:
                break;
        }
    }

    /**
     * 根据键值将数据放置对应的省市县区域代码中
     * @param {Object} obj 区划变更明细对照数据录入界面接口返回数据
     */
    export let placeData = (obj, codeRank) => {
        for (var key in obj) {
            switch (key) {
                case "1":
                    codeRank.province = obj[key];
                    break;
                case "2":
                    codeRank.city = obj[key];
                    break;
                case "3":
                    codeRank.county = obj[key];
                    break;
                case "4":
                    codeRank.township = obj[key];
                    break;
                case "5":
                    codeRank.village = obj[key];
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * 切分指定的区划代码
     * @param zoningCode
     * @returns {Array}
     */
    export let sliceSpecifiedCode = (zoningCode) => {
        var zoningCodeArray = [];
        for (var i = 0; i < 6; i++) {
            if (i < 3) {
                zoningCodeArray.push(zoningCode.substring(i * 2, (i + 1) * 2));
            } else {
                zoningCodeArray.push(zoningCode.substring((i - 1) * 3, i * 3));
            }
        }
        return zoningCodeArray;
    }