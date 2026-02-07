import type { ResumeObj } from "@/shared/api/types";
import { GRID_ITEM_CELL_HEIGHT, GRID_ITEM_CELL_WIDTH, ResumeEmailContent, ResumePhotoImg, type GridItemConfig, type GridItemContentConfig } from "./Resume.styles"
import { formatPostalCode, measureTextLineCount } from '@/shared/utils/format';
import dayjs from 'dayjs';
import resumePhotoDefaultImg from '@/shared/assets/icons/icon_resume_photo.png';

export type GridItemAdjustableOptions = {
  adjustKey: string;
  colAdjustable?: {
    currentWidth: number;
    minWidth: number;
    maxWidth: number;
  };
};

export type ResumeGridItem = GridItemConfig & {
  content: React.ReactNode;
  innerContent?: React.ReactNode;
  innerContentConfig?: GridItemContentConfig;
  key?: keyof ResumeObj['values'];
  propId?: string;
  entityKey?: string;
  columnWidth?: number;
  adjustableOptions?: GridItemAdjustableOptions;
};

export const formatResumeGridItems = (resume: ResumeObj): ResumeGridItem[][] => {
  const gridItemsList: ResumeGridItem[][] = [[]];

  // 現在のページ
  let currentPageCount = 1;
  // 残りのgridRowsの開始位置(最初の一個は余白用のため不使用)
  let currentGridRowCount = 1;
  // 一枚目かどうか
  const isFirstPaper = () => currentPageCount === 1;
  // 現在のgridRowsの開始位置
  const currentGridRowStart = () => (currentGridRowCount % 46) + 1;
  // 残りのgridRowsの個数
  const remainingGridRows = () => 46 - (currentGridRowStart() - 1);
  // 次に使用する予定の行数から、そのページの最後の行か判定
  const checkIsLastRow = (usingRowHeight: number, nextUsingRowHeight: number) => {
    // 自身が超える場合はfalse
    if (usingRowHeight > (remainingGridRows() - 1)) return false;
    // 自身は超えず、次が超える場合はtrue
    if (usingRowHeight + nextUsingRowHeight > (remainingGridRows() - 1)) return true;
    // どちらも超えない場合はfalse
    return false;
  };
  // 使用する配列を選択
  const selectPage = (usingRowHeight: number, mutableItems: ResumeGridItem[]) : ResumeGridItem[] => {
    // 最後の一個は余白使用のため不使用
    if (usingRowHeight > (remainingGridRows() - 1)) {
      forcePageBreak();

      // 改ページした場合、各itemのrow位置を調整した上で、borderTopを閉じます
      mutableItems.forEach(item => {
        const itemRowCount = item.$rows[1] - item.$rows[0];
        item.$rows = [currentGridRowStart(), currentGridRowStart() + itemRowCount];
        if (!item.$borders) item.$borders = {};
        item.$borders.top = true;
      });
    }
    return gridItemsList[currentPageCount - 1];
  };
  // 強制改ページ
  const forcePageBreak = () => {
    // 次ページの最初の行に移動
    gridItemsList.push([]);
    currentPageCount += 1;
    currentGridRowCount = (46 * (currentPageCount - 1)) + 1;
  }
  // 配列に追加し、開始位置を更新
  const appendList = (usingRowHeight: number, items: ResumeGridItem[]) => {
    const targetList = selectPage(usingRowHeight, items);
    targetList.push(...items);
    currentGridRowCount += usingRowHeight;
  };

  // 変更可能なカラム幅の計算
  const getColEndByLayoutKey = (adjustKey: string, startCol: number, defaultWidth: number) => {
    const columnWidth = resume.layouts?.[adjustKey]?.columnWidth || defaultWidth;
    return startCol + columnWidth;
  };

  // 基本項目
  const birthdateColEnd = getColEndByLayoutKey('birthdate', 2, (resume.isGenderVisible ? 16 : 21));
  appendList(7, [
    {
      $cols: [2, 14], $rows: [2, 4], $letterSpacing: 14, $paddings: { left: 0 }, $fontSize: 32,
      content: '履歴書',
    },
    {
      $cols: [14, 23], $rows: [2, 4], $paddings: { right: 0 }, $justifyContent: 'end', $fontSize: 14,
      content: resume.values.displayDate ? dayjs(resume.values.displayDate).format('YYYY年 MM月 DD日現在') : `年    月    日現在`,
      key: 'displayDate',
    },
    {
      $cols: [2, 23], $rows: [4, 5], $borders: { top: true, bottom: 'thin', right: true, left: true },
      content: 'ふりがな',
      innerContent: `${ resume.values.familyNameRuby } ${ resume.values.nameRuby }`,
      innerContentConfig: { $paddings: { left: 12 }, $fontSize: 12, $noWrap: true },
      key: 'familyNameRuby',
    },
    {
      $cols: [2, 23], $rows: [5, 8], $borders: { top: false, bottom: false, right: true, left: true },
      content: '氏名',
      innerContent: `${ resume.values.familyName } ${ resume.values.name }`,
      innerContentConfig: { $paddings: { left: 12 + 28.5 }, $fontSize: 22 },
      key: 'familyName',
    },
    {
      $cols: [2, resume.isGenderVisible ? birthdateColEnd : 23], $rows: [8, 9], $borders: { top: true, bottom: false, right: true, left: true }, $paddings: { right: 12 }, $justifyContent: 'end', $fontSize: 16,
      content: (() => {
        if (!resume.values.birthdate) return '年    月    日生 (満    歳)';

        const birthDay = dayjs(resume.values.birthdate);
        const age = dayjs(resume.values.displayDate || new Date()).diff(birthDay, 'year');
        return `${ birthDay.format('YYYY年 MM月 DD日生') } (満${ age }歳)`;
      })(),
      key: 'birthdate',
      adjustableOptions: resume.isGenderVisible ? {
        adjustKey: 'birthdate',
        colAdjustable: {
          currentWidth: (birthdateColEnd - 2),
          minWidth: 12,
          maxWidth: 17,
        },
      } : undefined,
    },
    {
      $cols: [24, 31], $rows: [2, 8], $justifyContent: 'center', $alignItems: 'end',
      content: (
        <ResumePhotoImg
          src={ resume.values.photoImg || resumePhotoDefaultImg }
          alt="履歴書写真"
        />
      ),
      key: 'photoImg',
    },
  ]);

  // 性別欄
  if (resume.isGenderVisible) appendList(0, [
    {
      $cols: [birthdateColEnd, 23], $rows: [8, 9], $borders: { top: true, bottom: false, right: true, left: false },
      content: '性別',
      innerContent: resume.values.gender,
      innerContentConfig: { $justifyContent: 'center' },
      key: 'gender',
    },
  ]);
  
  // 住所・連絡先欄
  const appendAddressLikeItems = (sectionKey: 'address' | 'contactAddress', startRow: number) => {
    const adjustedColEnd = getColEndByLayoutKey(sectionKey, 2, 22);
    const addressAdjustableOptions = {
      adjustKey: sectionKey,
      colAdjustable: {
        currentWidth: (adjustedColEnd - 2),
        minWidth: 8,
        maxWidth: 26,
      },
    };
    const calcRows = (rowOffset: number, usingRowHeight: number) : [number, number] => {
      const rows: [number, number] = [startRow + rowOffset, startRow + rowOffset + usingRowHeight];
      return rows;
    };
    // 連絡先欄は住所欄の下に追加するため、開始行のボーダーを消します
    const borderTop = sectionKey === 'address' ? true : false;
    
    appendList(4, [
      {
        $cols: [2, adjustedColEnd], $rows: calcRows(0, 1), $borders: { top: borderTop, bottom: 'thin', right: true, left: true },
        content: 'ふりがな',
        innerContent: `${ resume.values[sectionKey].line1Ruby } ${ resume.values[sectionKey].line2Ruby }`,
        innerContentConfig: { $paddings: { left: 12 }, $fontSize: 12, $noWrap: true },
        key: sectionKey,
        propId: 'line1Ruby',
        adjustableOptions: addressAdjustableOptions,
      },
      {
        $cols: [2, adjustedColEnd], $rows: calcRows(1, 3), $borders: { top: false, bottom: true, right: true, left: true },
        content: '現住所',
        innerContent: `〒${ formatPostalCode(resume.values[sectionKey].postalCode) }\n${ resume.values[sectionKey].line1 }\n${ resume.values[sectionKey].line2 }`,
        innerContentConfig: { $paddings: { left: 12 + 13.5 } },
        key: sectionKey,
        propId: 'line1',
        adjustableOptions: addressAdjustableOptions,
      },
      {
        $cols: [adjustedColEnd, 32], $rows: calcRows(0, 1), $borders: { top: borderTop, bottom: 'thin', right: true, left: false }, $noWrap: true,
        content: '電話',
        innerContent: resume.values[sectionKey].tel,
        innerContentConfig: { $justifyContent: 'center' },
        key: sectionKey,
        propId: 'tel',
      },
      {
        $cols: [adjustedColEnd, 32], $rows: calcRows(1, 3), $borders: { top: false, bottom: true, right: true, left: false },
        content: (
          <ResumeEmailContent>
            <div>Eメール</div>
            <div>{ resume.values[sectionKey].email }</div>
          </ResumeEmailContent>
        ),
        key: sectionKey,
        propId: 'email',
      },
    ]);
  };
  appendAddressLikeItems('address', 9);
  if (resume.isContactVisible) appendAddressLikeItems('contactAddress', 13);

  // 空白行
  appendList(1, []);

  // 学歴・職歴・資格欄で共通利用するフォーマット
  type EducationLikeItem = {
    borders?: GridItemConfig['$borders'];
    justifyContent?: GridItemConfig['$justifyContent'];
    content: ResumeGridItem['content'];
    innerContent?: ResumeGridItem['innerContent'];
    innerContentConfig?: ResumeGridItem['innerContentConfig'];
  };
  const appendEducationLikeItems = (
    sectionKey: 'educations' | 'experiences' | 'certifications',
    items: [EducationLikeItem, EducationLikeItem, EducationLikeItem],
    additionalProps?: { propId?: ResumeGridItem['propId'] },
  ) => {
    const rowStart = currentGridRowStart();
    appendList(2, [
      {
        $cols: [2, 5], $rows: [rowStart, rowStart + 2], $borders: { top: false, bottom: 'thin', right: true, left: true, ...items[0].borders }, $justifyContent: items[0].justifyContent,
        content: items[0].content,
        innerContent: items[0].innerContent,
        innerContentConfig: items[0].innerContentConfig,
        key: sectionKey,
        entityKey: 'year',
        propId: additionalProps?.propId,
      },
      {
        $cols: [5, 7], $rows: [rowStart, rowStart + 2], $borders: { top: false, bottom: 'thin', right: true, left: false, ...items[1].borders }, $justifyContent: items[1].justifyContent,
        content: items[1].content,
        innerContent: items[1].innerContent,
        innerContentConfig: items[1].innerContentConfig,
        key: sectionKey,
        entityKey: 'month',
        propId: additionalProps?.propId,
      },
      {
        $cols: [7, 32], $rows: [rowStart, rowStart + 2], $borders: { top: false, bottom: 'thin', right: true, left: false, ...items[2].borders }, $justifyContent: items[2].justifyContent,
        content: items[2].content,
        innerContent: items[2].innerContent,
        innerContentConfig: items[2].innerContentConfig,
        key: sectionKey,
        entityKey: 'content',
        propId: additionalProps?.propId,
      },
    ]);
  };

  // 学歴・職歴欄(データが短くても、空欄で埋めて1ページ目を使い切ります)
  appendEducationLikeItems('educations', [
    {
      borders: { top: true, bottom: 'double' }, justifyContent: 'center',
      content: '年',
    },
    {
      borders: { top: true, bottom: 'double' }, justifyContent: 'center',
      content: '月',
    },
    {
      borders: { top: true, bottom: 'double' }, justifyContent: 'center',
      content: '学歴・職歴',
    },
  ]);

  const fillWithEmptyRows = (key: 'educations' | 'experiences') => {
    while (remainingGridRows() >= 2) {
      const isLastRow = checkIsLastRow(2, 2);
      const borderBottom = isLastRow ? true : 'thin';

      appendEducationLikeItems(key, [
        { borders: { bottom: borderBottom }, content: '' },
        { borders: { bottom: borderBottom }, content: '' },
        { borders: { bottom: borderBottom }, content: '' },
      ]);

      if (isLastRow) break;
    }
  };

  [
    { label: '学歴', items: resume.values.educations },
    { label: '職歴', items: resume.values.experiences },
  ].forEach(({ label, items }, listIndex) => {
    const key = listIndex === 0 ? 'educations' : 'experiences';

    // 見出し行
    appendEducationLikeItems(key, [
      {
        justifyContent: 'center',
        content: '',
      },
      {
        justifyContent: 'center',
        content: '',
      },
      {
        justifyContent: 'center',
        content: null,
        innerContent: label,
        innerContentConfig: { $justifyContent: 'center' },
      },
    ]);

    // 各行
    items.ids.forEach((id, index, array) => {
      const isLastItem = index === array.length - 1;

      const item = items.entities[id as keyof typeof items.entities] as {
        year: string;
        month: string;
        content: string;
      };

      // 最後の行になる場合は、欄を閉じる(1ページ目の場合は使い切るまで最後の行扱いしないようにします)
      const isLastRow = checkIsLastRow(2, 2) || (!isFirstPaper() && key === 'experiences' && isLastItem);
      let borderBottom: (boolean | 'thin') = isLastRow ? true : 'thin';
  
      appendEducationLikeItems(key, [
        {
          borders: { bottom: borderBottom },
          content: null,
          innerContent: item.year,
          innerContentConfig: { $justifyContent: 'center' },
        },
        {
          borders: { bottom: borderBottom },
          content: null,
          innerContent: item.month,
          innerContentConfig: { $justifyContent: 'center' },
        },
        {
          borders: { bottom: borderBottom },
          content: null,
          innerContent: item.content,
          innerContentConfig: { $paddings: { left: 8, right: 8 } },
        },
      ], { propId: id });

      // 空白埋めチェック
      if (isLastItem) {
        // パターン1: 最後の学歴の時点で、残りの行数が1行分のみの場合（「職歴」の記載直後が改ページにならないように）
        if (key === 'educations' && remainingGridRows() <= 3) {
          fillWithEmptyRows(key);
        }

        // パターン2: 最後の職歴の時点でまだ1ページ目の場合
        if (key === 'experiences' && isFirstPaper()) {
          fillWithEmptyRows(key);
        }

        // パターン3: 最後の職歴の時点で2ページ目の場合、直後に空行を追加する
        if (key === 'experiences' && !isFirstPaper()) {
          appendList(1, []);
        }
      }
    });
  });  

  // 資格欄
  appendEducationLikeItems('certifications', [
    {
      borders: { top: true, bottom: 'double' }, justifyContent: 'center',
      content: '年',
    },
    {
      borders: { top: true, bottom: 'double' }, justifyContent: 'center',
      content: '月',
    },
    {
      borders: { top: true, bottom: 'double' }, justifyContent: 'center',
      content: '資格・免許',
    },
  ]);

  // もし資格が無くても、1行は表示します
  if (resume.values.certifications.ids.length === 0) appendEducationLikeItems('certifications', [
    { borders: { bottom: true }, content: '' },
    { borders: { bottom: true }, content: '' },
    { borders: { bottom: true }, content: '' },
  ]);

  // 各行
  resume.values.certifications.ids.forEach((id, index, array) => {
    const isLastItem = index === array.length - 1;
    const isLastRow = checkIsLastRow(2, 2);
    const borderBottom = (isLastItem || isLastRow) ? true : 'thin';

    const item = resume.values.certifications.entities[id as keyof typeof resume.values.certifications.entities] as {
      year: string;
      month: string;
      content: string;
    };

    appendEducationLikeItems('certifications', [
      {
        borders: { bottom: borderBottom },
        content: null,
        innerContent: item.year,
        innerContentConfig: { $justifyContent: 'center' },
      },
      {
        borders: { bottom: borderBottom },
        content: null,
        innerContent: item.month,
        innerContentConfig: { $justifyContent: 'center' },
      },
      {
        borders: { bottom: borderBottom },
        content: null,
        innerContent: item.content,
        innerContentConfig: { $paddings: { left: 8, right: 8 } },
      },
    ], { propId: id });
  });

  // カスタム欄
  let lastAppended: (ResumeGridItem | null) = null;
  resume.values.customs.ids.forEach((id) => {
    const item = resume.values.customs.entities[id as keyof typeof resume.values.customs.entities] as {
      label: string;
      content: string;
    };

    // 空白行を追加する必要があるかどうか※改行直後の一番上の行でない場合に追加
    let isBlankRowRequired = currentGridRowStart() > 1;

    // 残りの内容行に使える行数を計算(空白行 + 見出し行 + 最小の内容として1行分 + 最後のページ余白行1行分)
    const availableContentRows = remainingGridRows() - (isBlankRowRequired ? 1 : 0) - 2 - 1;
    if (availableContentRows <= 0) {
      // 行数が足りない場合は改ページ
      forcePageBreak();
      isBlankRowRequired = false;
    };

    // 内容行の行数を計算
    const CUSTOM_INNER_CONTENT_CLIENT_WIDTH = GRID_ITEM_CELL_WIDTH * 30 - 2 * 2 - 4 * 2 - 8 * 2;
    const { lineCount, rowCount, firstPartLineCount, firstPartRowCount, exceededIndex } = measureTextLineCount(
      item.content,
      CUSTOM_INNER_CONTENT_CLIENT_WIDTH,
      { fontSize: 16, letterSpacing: 2, lineHeight: 1 },
      (availableContentRows * GRID_ITEM_CELL_HEIGHT - (8 * 2) - (2 * 2) - 9.5),
      GRID_ITEM_CELL_HEIGHT,
    );

    // 手前に何らかの欄がある場合のみ空白行を追加
    if (isBlankRowRequired) appendList(1, []);

    // 見出し行の追加
    appendList(2, [
      {
        $cols: [2, 32], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: true, bottom: 'double', right: true, left: true },
        content: item.label,
        key: 'customs',
        propId: id,
        entityKey: 'label',
      },
    ]);
    
    // 内容行の追加
    // 内容行の途中で改ページが必要な場合は、内容行を分割します
    // [memo] 改行した上で1枚全て使い切り、2回以上の改行が必要になる場合には対応していません
    let partedContentList = exceededIndex !== -1
      ? [
          {
            content: item.content.slice(0, exceededIndex),
            lineCount: firstPartLineCount,
            rowCount: firstPartRowCount
          },
          {
            content: item.content.slice(exceededIndex),
            lineCount: (lineCount - firstPartLineCount),
            rowCount: rowCount - firstPartRowCount
          },
        ]
      : [{ content: item.content, lineCount, rowCount: rowCount }];

    partedContentList.forEach((partedContent, partIndex) => {
      // セル何個分が必要か計算(上下余白分も考慮します)（必ず一行は表示します）
      const requiredGridRowsForContent = Math.min(
        Math.ceil((((partedContent.lineCount || 1) * (16 * 1)) + (8 * 2)) / GRID_ITEM_CELL_HEIGHT),
        44,
      );

      lastAppended = {
        $cols: [2, 32], $rows: [currentGridRowStart(), currentGridRowStart() + requiredGridRowsForContent],
        $borders: { top: partIndex === 0 ? false : true, bottom: true, right: true, left: true }, $alignItems: 'start',
        content: null,
        innerContent: partedContent.content,
        innerContentConfig: { $paddings: { left: 8, right: 8, top: 8, bottom: 8 } },
        key: 'customs',
        propId: id,
        entityKey: 'content',
      };
      appendList(requiredGridRowsForContent, [lastAppended]);
    });
  });

  // 最後に追加されたカスタム欄の高さをページ末尾まで伸ばす
  // 2ページを超えている場合は通常の履歴書フォーマットに合わせる必要がないため、対象外とします
  if (lastAppended && remainingGridRows() > 1 && currentPageCount === 2) {
    (lastAppended as ResumeGridItem).$rows[1] += (remainingGridRows() - 1);
  }

  return gridItemsList;
};
