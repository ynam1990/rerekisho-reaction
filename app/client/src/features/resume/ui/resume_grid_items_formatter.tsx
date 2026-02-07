import type { ResumeObj } from "@/shared/api/types";
import { ResumeEmailContent, ResumePhotoImg, type GridItemConfig, type GridItemContentConfig } from "./Resume.styles"
import { formatPostalCode } from '@/shared/utils/format';
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

  // 学歴・職歴欄(データが短くても、空欄で埋めて1ページ目を使い切ります)
  appendList(2, [
    {
      $cols: [2, 5], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: true, bottom: 'double', right: true, left: true }, $justifyContent: 'center',
      content: '年',
      key: 'educations',
      entityKey: 'year',
    },
    {
      $cols: [5, 7], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: true, bottom: 'double', right: true, left: false }, $justifyContent: 'center',
      content: '月',
      key: 'educations',
      entityKey: 'month',
    },
    {
      $cols: [7, 32], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: true, bottom: 'double', right: true, left: false }, $justifyContent: 'center',
      content: '学歴・職歴',
      key: 'educations',
      entityKey: 'content',
    },
  ]);

  const fillWithEmptyRows = (key: 'educations' | 'experiences') => {
    while (remainingGridRows() >= 2) {
      const isLastRow = checkIsLastRow(2, 2);
      const borderBottom = isLastRow ? true : 'thin';

      appendList(2, [
        {
          $cols: [2, 5], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: borderBottom, right: true, left: true },
          content: '',
          key: key,
          entityKey: 'year',
        },
        {
          $cols: [5, 7], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: borderBottom, right: true, left: false },
          content: '',
          key: key,
          entityKey: 'month',
        },
        {
          $cols: [7, 32], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: borderBottom, right: true, left: false },
          content: '',
          key: key,
          entityKey: 'content',
        },
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
    appendList(2, [
      {
        $cols: [2, 5], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: 'thin', right: true, left: true }, $justifyContent: 'center',
        content: '',
        key: key,
        entityKey: 'year',
      },
      {
        $cols: [5, 7], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: 'thin', right: true, left: false }, $justifyContent: 'center',
        content: '',
        key: key,
        entityKey: 'month',
      },
      {
        $cols: [7, 32], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: 'thin', right: true, left: false },
        content: null,
        innerContent: label,
        innerContentConfig: { $justifyContent: 'center' },
        key: key,
        entityKey: 'content',
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
  
      appendList(2, [
        {
          $cols: [2, 5], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: borderBottom, right: true, left: true },
          content: null,
          innerContent: item.year,
          innerContentConfig: { $justifyContent: 'center' },
          key: key,
          propId: id,
          entityKey: 'year',
        },
        {
          $cols: [5, 7], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: borderBottom, right: true, left: false },
          content: null,
          innerContent: item.month,
          innerContentConfig: { $justifyContent: 'center' },
          key: key,
          propId: id,
          entityKey: 'month',
        },
        {
          $cols: [7, 32], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: borderBottom, right: true, left: false },
          content: null,
          innerContent: item.content,
          innerContentConfig: { $paddings: { left: 8, right: 8 } },
          key: key,
          propId: id,
          entityKey: 'content',
        },
      ]);

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
  appendList(2, [
    {
      $cols: [2, 5], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: true, bottom: 'double', right: true, left: true }, $justifyContent: 'center',
      content: '年',
      key: 'certifications',
      entityKey: 'year',
    },
    {
      $cols: [5, 7], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: true, bottom: 'double', right: true, left: false }, $justifyContent: 'center',
      content: '月',
      key: 'certifications',
      entityKey: 'month',
    },
    {
      $cols: [7, 32], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: true, bottom: 'double', right: true, left: false }, $justifyContent: 'center',
      content: '資格・免許',
      key: 'certifications',
      entityKey: 'content',
    },
  ]);

  // もし資格が無くても、1行は表示する
  if (resume.values.certifications.ids.length === 0) appendList(2, [
    {
      $cols: [2, 5], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: true, right: true, left: true },
      content: '',
      key: 'certifications',
      entityKey: 'year',
    },
    {
      $cols: [5, 7], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: true, right: true, left: false },
      content: '',
      key: 'certifications',
      entityKey: 'month',
    },
    {
      $cols: [7, 32], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: true, right: true, left: false },
      content: '',
      key: 'certifications',
      entityKey: 'content',
    },
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

    appendList(2, [
      {
        $cols: [2, 5], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: borderBottom, right: true, left: true },
        content: null,
        innerContent: item.year,
        innerContentConfig: { $justifyContent: 'center' },
        key: 'certifications',
        propId: id,
        entityKey: 'year',
      },
      {
        $cols: [5, 7], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: borderBottom, right: true, left: false },
        content: null,
        innerContent: item.month,
        innerContentConfig: { $justifyContent: 'center' },
        key: 'certifications',
        propId: id,
        entityKey: 'month',
      },
      {
        $cols: [7, 32], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: false, bottom: borderBottom, right: true, left: false },
        content: null,
        innerContent: item.content,
        innerContentConfig: { $paddings: { left: 8, right: 8 } },
        key: 'certifications',
        propId: id,
        entityKey: 'content',
      },
    ]);
  });

  // カスタム欄
  let lastAppended: (ResumeGridItem | null) = null;
  resume.values.customs.ids.forEach((id) => {
    const item = resume.values.customs.entities[id as keyof typeof resume.values.customs.entities] as {
      label: string;
      content: string;
    };

    // contentを改行コードで分割
    const contentLines = item.content.split(/\r\n|\r|\n/);
    // 最低2行から行数カウントを始めます
    let contentLineCount = Math.max(contentLines.length, 2);
    // 各行の長さをチェックし、37文字を超える場合は行数を追加
    // [memo] 半角文字の場合はより多くの文字が入りますが、簡易的に37文字で計算しています
    contentLines.forEach(line => {
      const lineLength = line.length;
      if (lineLength > 37) {
        contentLineCount += Math.floor(lineLength / 37);
      }
    });

    // 残りの行数が足りない場合は、改行して次のページに追加します
    // (空白行 + 見出し行)が最後の行になるかどうかで判定
    const isLastRow = checkIsLastRow(1 + 2, contentLineCount);
    if (isLastRow) {
      forcePageBreak();
    } else if (currentGridRowStart() > 1) {
      // 手前に何らかの欄がある場合のみ空白行を追加
      appendList(1, []);
    }

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
    lastAppended = {
      $cols: [2, 32], $rows: [currentGridRowStart(), currentGridRowStart() + contentLineCount], $borders: { top: false, bottom: true, right: true, left: true },
      content: null,
      innerContent: item.content,
      innerContentConfig: { $paddings: { left: 8, right: 8 } },
      key: 'customs',
      propId: id,
      entityKey: 'content',
    };
    appendList(contentLineCount, [lastAppended]);
  });

  // 最後に追加されたカスタム欄の高さをページ末尾まで伸ばす
  // 2ページを超えている場合は通常の履歴書フォーマットに合わせる必要がないため、対象外とします
  if (lastAppended && remainingGridRows() > 1 && currentPageCount === 2) {
    (lastAppended as ResumeGridItem).$rows[1] += (remainingGridRows() - 1);
  }

  return gridItemsList;
};
