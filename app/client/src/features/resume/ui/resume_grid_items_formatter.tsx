import type { ResumeObj } from '../model/resume_mock';
import { ResumeEmailContent, ResumePhotoImg, type GridItemConfig, type GridItemContentConfig } from "./Resume.styles"
import { formatPostalCode } from '@/shared/utils/format';
import dayjs from 'dayjs';
import resumePhotoDefaultImg from '@/shared/assets/icons/icon_resume_photo.png';

export type ResumeGridItem = GridItemConfig & {
  content: React.ReactNode;
  innerContent?: React.ReactNode;
  innerContentConfig?: GridItemContentConfig;
  key?: keyof ResumeObj['values'];
  propId?: string;
  entityKey?: string;
};

export const formatResumeGridItems = (resume: ResumeObj): [ResumeGridItem[], ResumeGridItem[]] => {
  const paper1GridItemsList: ResumeGridItem[] = [];
  const paper2GridItemsList: ResumeGridItem[] = [];

  // 残りのgridRowsの開始位置(最初の一個は余白用のため不使用)
  let currentGridRowCount = 1;
  // 一枚目かどうか
  const isFirstPaper = () => currentGridRowCount < 46;
  // 現在のgridRowsの開始位置
  const currentGridRowStart = () => isFirstPaper() ? currentGridRowCount + 1 : (currentGridRowCount - 46) + 1;
  // 残りのgridRowsの個数
  const remainingGridRows = () => 46 - (currentGridRowStart() - 1);
  // 使用する配列を選択
  const selectList = (usingRowHeight: number) : ResumeGridItem[] => {
    return isFirstPaper() && usingRowHeight <= remainingGridRows() ? paper1GridItemsList : paper2GridItemsList;
  };
  // 強制改ページ
  const forcePageBreak = () => {
    if (isFirstPaper()) {
      // 2枚目の最初の行に移動
      currentGridRowCount = 46 + 1;
    }
  }
  // 配列に追加し、開始位置を更新
  const appendList = (usingRowHeight: number, items: ResumeGridItem[]) => {
    const targetList = selectList(usingRowHeight);
    targetList.push(...items);
    currentGridRowCount += usingRowHeight;
  };

  // 基本項目
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
      $cols: [2, resume.isGenderVisible ? 18 : 23], $rows: [8, 9], $borders: { top: true, bottom: false, right: true, left: true }, $paddings: { right: 12 }, $justifyContent: 'end', $fontSize: 16,
      content: (() => {
        if (!resume.values.birthdate) return '年    月    日生 (満    歳)';

        const birthDay = dayjs(resume.values.birthdate);
        const age = dayjs().diff(birthDay, 'year');
        return `${ birthDay.format('YYYY年 MM月 DD日生') } (満${ age }歳)`;
      })(),
      key: 'birthdate',
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
      $cols: [18, 23], $rows: [8, 9], $borders: { top: true, bottom: false, right: true, left: false }, $justifyContent: 'center',
      content: '性別',
      innerContent: resume.values.gender,
      innerContentConfig: { $justifyContent: 'center' },
      key: 'gender',
    },
  ]);
  
  // 住所欄
  appendList(4, [
    {
      $cols: [2, 24], $rows: [9, 10], $borders: { top: true, bottom: 'thin', right: true, left: true },
      content: 'ふりがな',
      innerContent: `${ resume.values.address.line1Ruby } ${ resume.values.address.line2Ruby }`,
      innerContentConfig: { $paddings: { left: 12 }, $fontSize: 12, $noWrap: true },
      key: 'address',
      propId: 'line1Ruby',
    },
    {
      $cols: [2, 24], $rows: [10, 13], $borders: { top: false, bottom: true, right: true, left: true },
      content: '現住所',
      innerContent: `〒${ formatPostalCode(resume.values.address.postalCode) }\n${ resume.values.address.line1 }\n${ resume.values.address.line2 }`,
      innerContentConfig: { $paddings: { left: 12 + 13.5 } },
      key: 'address',
      propId: 'line1',
    },
    {
      $cols: [24, 32], $rows: [9, 10], $borders: { top: true, bottom: 'thin', right: true, left: false }, $noWrap: true,
      content: '電話',
      innerContent: resume.values.address.tel,
      innerContentConfig: { $justifyContent: 'center' },
      key: 'address',
      propId: 'tel',
    },
    {
      $cols: [24, 32], $rows: [10, 13], $borders: { top: false, bottom: true, right: true, left: false },
      content: (
        <ResumeEmailContent>
          <div>Eメール</div>
          <div>{ resume.values.address.email }</div>
        </ResumeEmailContent>
      ),
      key: 'address',
      propId: 'email',
    },
  ]);

  // 連絡先が表示される場合の追加項目
  if (resume.isContactVisible) {
    appendList(4, [
      {
        $cols: [2, 24], $rows: [13, 14], $borders: { top: false, bottom: 'thin', right: true, left: true },
        content: 'ふりがな',
        innerContent: `${ resume.values.contactAddress.line1Ruby } ${ resume.values.contactAddress.line2Ruby }`,
        innerContentConfig: { $paddings: { left: 12 }, $fontSize: 12, $noWrap: true },
        key: 'contactAddress',
        propId: 'line1Ruby',
      },
      {
        $cols: [2, 24], $rows: [14, 17], $borders: { top: false, bottom: true, right: true, left: true },
        content: '連絡先',
        innerContent: `〒${ formatPostalCode(resume.values.contactAddress.postalCode) }\n${ resume.values.contactAddress.line1 }\n${ resume.values.contactAddress.line2 }`,
        innerContentConfig: { $paddings: { left: 12 + 13.5 } },
        key: 'contactAddress',
        propId: 'line1',
      },
      {
        $cols: [24, 32], $rows: [13, 14], $borders: { top: false, bottom: 'thin', right: true, left: false }, $noWrap: true,
        content: '電話',
        innerContent: resume.values.contactAddress.tel,
        innerContentConfig: { $justifyContent: 'center' },
        key: 'contactAddress',
        propId: 'tel',
      },
      {
        $cols: [24, 32], $rows: [14, 17], $borders: { top: false, bottom: true, right: true, left: false },
        content: (
          <ResumeEmailContent>
            <div>Eメール</div>
            <div>{ resume.values.contactAddress.email }</div>
          </ResumeEmailContent>
        ),
        key: 'contactAddress',
        propId: 'email',
      },
    ]);
  }

  // 空白行
  appendList(1, []);

  // 学歴・職歴欄
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
      const isLastRow = remainingGridRows() <= 3;
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

      if (isLastRow) {
        forcePageBreak();
        break;
      }
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

      // 2ページ目の最初の行は上を閉じる
      const borderTop = !isFirstPaper() && currentGridRowStart() <= 2 ? true : false;

      // 最後の行になる場合は、欄を閉じる
      const isLastRow = remainingGridRows() <= 3 || (!isFirstPaper() && key === 'experiences' && isLastItem);
      let borderBottom: (boolean | 'thin') = isLastRow ? true : 'thin';
  
      appendList(2, [
        {
          $cols: [2, 5], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: borderTop, bottom: borderBottom, right: true, left: true },
          content: null,
          innerContent: item.year,
          innerContentConfig: { $justifyContent: 'center' },
          key: key,
          propId: id,
          entityKey: 'year',
        },
        {
          $cols: [5, 7], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: borderTop, bottom: borderBottom, right: true, left: false },
          content: null,
          innerContent: item.month,
          innerContentConfig: { $justifyContent: 'center' },
          key: key,
          propId: id,
          entityKey: 'month',
        },
        {
          $cols: [7, 32], $rows: [currentGridRowStart(), currentGridRowStart() + 2], $borders: { top: borderTop, bottom: borderBottom, right: true, left: false },
          content: null,
          innerContent: item.content,
          innerContentConfig: { $paddings: { left: 8, right: 8 } },
          key: key,
          propId: id,
          entityKey: 'content',
        },
      ]);

      if (isLastRow) forcePageBreak();

      // 空白埋めチェック
      if (isLastItem) {
        // パターン1: 最後の学歴の時点で、残りの行数が1行分のみの場合（「職歴」の記載直後が改ページにならないように）
        if (key === 'educations' && remainingGridRows() === 2) {
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
    const borderBottom = isLastItem ? true : 'thin';

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

    // contentの長さから、内容行の高さを計算
    const contentLength = item.content.length;
    // 余裕を持って42文字で1行換算、最低2行
    const contentRowHeight = Math.max(2, Math.ceil(contentLength / 42));

    // 残りの行数が足りない場合は、描画を省略します
    if (remainingGridRows() < 2 + contentRowHeight + 1) return;

    // 空白行
    appendList(1, []);

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
      $cols: [2, 32], $rows: [currentGridRowStart(), currentGridRowStart() + contentRowHeight], $borders: { top: false, bottom: true, right: true, left: true },
      content: null,
      innerContent: item.content,
      innerContentConfig: { $paddings: { left: 8, right: 8 } },
      key: 'customs',
      propId: id,
      entityKey: 'content',
    };
    appendList(contentRowHeight, [lastAppended]);
  });

  // 最後に追加されたカスタム欄の高さをページ末尾まで伸ばす
  if (lastAppended && remainingGridRows() > 1) {
    (lastAppended as ResumeGridItem).$rows[1] += (remainingGridRows() - 1);
  }

  return [paper1GridItemsList, paper2GridItemsList];
};
