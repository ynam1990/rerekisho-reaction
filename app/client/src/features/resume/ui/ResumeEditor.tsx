import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { ResumeEditorInnerWrapper, ResumeEditorWrapper, ResumeEditorHeader, ResumeEditorBody, EditorRow, StyledLabel, StyledInput, StyledHeading, EditorRowInner, ModalButtonsWrapper } from "./ResumeEditor.styles";
import dayjs from "dayjs";
import type { ResumeObj } from "../model/resume_mock";
import { Button, Close, MonthInput } from "@/shared/ui/atoms";
import { addToEntities, EMPTY_YEAR_MONTH_DATA, removeFromEntities, updateEntities, updateResume, updateValues } from "@/features/resume";
import { CheckboxWithLabel, ImgInput, Modal, type ModalHandle } from "@/shared/ui/molecules";

type Props = {
  resume: ResumeObj;
};

export type ResumeEditorHandle = {
  open: (key: keyof ResumeObj['values'], propId?: string, entityKey?: string) => void;
  close: () => void;
};

export const ResumeEditor = forwardRef<ResumeEditorHandle, Props>((props, ref) => {
  const { resume } = props;
  
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  useImperativeHandle(ref, () => ({
    open: (key: keyof ResumeObj['values'], propId?: string, entityKey?: string) => {
      setIsOpen(true);

      // 対象要素を探してフォーカスします
      let targetQuery = `[data-key='${ key }']`;
      if (propId) {
        targetQuery += `[data-prop-id='${ propId }']`;
      }
      if (entityKey) {
        targetQuery += `[data-entity-key='${ entityKey }']`;
      }
      const targetInput = document.querySelector<HTMLElement>(targetQuery);
      targetInput?.focus();
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  // 削除確認
  const modalRef = useRef<ModalHandle>(null);
  const showConfirmModal = (onConfirm: () => void, title?: string, content?: string) => {
    modalRef.current?.setContent({
      title: title ?? '項目削除',
      content: content ?? '項目を削除しますか？',
      footerContent: (
        <ModalButtonsWrapper>
          <Button
            styleType="solid"
            color="tertiary"
            size="md"
            onClick={ () => modalRef.current?.hide() }
          >
            キャンセル
          </Button>
          <Button
            styleType="solid"
            color="primary"
            size="md"
            onClick={ () => {
              modalRef.current?.hide();
              onConfirm();
            } }
          >
            削除する
          </Button>
        </ModalButtonsWrapper>
      ),
    });

    modalRef.current?.show();
  };


  return (
    <ResumeEditorWrapper $isOpen={ isOpen }>
      <ResumeEditorInnerWrapper>
        <ResumeEditorHeader>
          <Close onClick={ () => setIsOpen(false) } color="tertiary" />
        </ResumeEditorHeader>

        <ResumeEditorBody>
          <EditorRow>
            <StyledLabel>
              履歴書名
              <StyledInput
                name='name'
                data-key='name'
                value={ resume.name }
                onChange={ (e) => dispatch(updateResume({ name: e.target.value })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              提出日付
              <StyledInput
                name='display_date'
                data-key='displayDate'
                type='date'
                value={ resume.values.displayDate ? dayjs(resume.values.displayDate).format('YYYY-MM-DD') : '' }
                onChange={ (e) => dispatch(updateValues({ displayDate: e.target.value })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledHeading size="md">
              基本情報
            </StyledHeading>
          </EditorRow>

          <EditorRow $direction='row'>
            <StyledLabel>
              ふりがな
              <StyledInput
                name='family_name_ruby'
                data-key='familyNameRuby'
                value={ resume.values.familyNameRuby }
                onChange={ (e) => dispatch(updateValues({ familyNameRuby: e.target.value })) }
              />
            </StyledLabel>
            <StyledLabel>
              <StyledInput
                name='name_ruby'
                data-key='nameRuby'
                value={ resume.values.nameRuby }
                onChange={ (e) => dispatch(updateValues({ nameRuby: e.target.value })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow $direction='row'>
            <StyledLabel>
              姓
              <StyledInput
                name='family_name'
                data-key='familyName'
                value={ resume.values.familyName }
                onChange={ (e) => dispatch(updateValues({ familyName: e.target.value })) }
              />
            </StyledLabel>
            <StyledLabel>
              名
              <StyledInput
                name='name'
                data-key='name'
                value={ resume.values.name }
                onChange={ (e) => dispatch(updateValues({ name: e.target.value })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              生年月日
              <StyledInput
                name='birthdate'
                data-key='birthdate'
                type='date'
                value={ resume.values.birthdate ? dayjs(resume.values.birthdate).format('YYYY-MM-DD') : '' }
                onChange={ (e) => dispatch(updateValues({ birthdate: e.target.value })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              性別
              <StyledInput
                name='gender'
                data-key='gender'
                value={ resume.values.gender }
                onChange={ (e) => dispatch(updateValues({ gender: e.target.value })) }
              />
            </StyledLabel>

            <CheckboxWithLabel
              label="性別を履歴書に表示する"
              name="is_gender_visible"
              data-key='isGenderVisible'
              value={ resume.isGenderVisible }
              color="tertiary"
              labelColor="tertiary"
              onChange={ (e, newValue) => dispatch(updateResume({ isGenderVisible: newValue })) }
            />
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              証明写真
              <ImgInput
                name='photo_img'
                dataset={ { 'data-key': 'photoImg' } }
                value={ resume.values.photoImg }
                onChange={ (newValue) => dispatch(updateValues({ photoImg: newValue })) }
              />
              
              <Button
                styleType="text"
                color="tertiary"
                size="sm"
                onClick={ () => dispatch(updateValues({ photoImg: '' })) }
              >
                クリア
              </Button>
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledHeading size="md">
              住所
            </StyledHeading>
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              郵便番号
              <StyledInput
                name='address_postal_code'
                data-key='address'
                data-prop-id='postalCode'
                value={ resume.values.address.postalCode }
                maxLength={ 7 }
                onChange={ (e) => dispatch(updateValues({
                  address: {
                    ...resume.values.address,
                    postalCode: e.target.value,
                  },
                })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              ふりがな
              <StyledInput
                name='address_line1_ruby'
                data-key='address'
                data-prop-id='line1Ruby'
                value={ resume.values.address.line1Ruby }
                onChange={ (e) => dispatch(updateValues({
                  address: {
                    ...resume.values.address,
                    line1Ruby: e.target.value,
                  },
                })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              住所
              <StyledInput
                name='address_line1'
                data-key='address'
                data-prop-id='line1'
                value={ resume.values.address.line1 }
                onChange={ (e) => dispatch(updateValues({
                  address: {
                    ...resume.values.address,
                    line1: e.target.value,
                  },
                })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              ふりがな
              <StyledInput
                name='address_line2_ruby'
                data-key='address'
                data-prop-id='line2Ruby'
                value={ resume.values.address.line2Ruby }
                onChange={ (e) => dispatch(updateValues({
                  address: {
                    ...resume.values.address,
                    line2Ruby: e.target.value,
                  },
                })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              建物名・部屋番号等
              <StyledInput
                name='address_line2'
                data-key='address'
                data-prop-id='line2'
                value={ resume.values.address.line2 }
                onChange={ (e) => dispatch(updateValues({
                  address: {
                    ...resume.values.address,
                    line2: e.target.value,
                  },
                })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              電話番号
              <StyledInput
                name='address_tel'
                data-key='address'
                data-prop-id='tel'
                value={ resume.values.address.tel }
                onChange={ (e) => dispatch(updateValues({
                  address: {
                    ...resume.values.address,
                    tel: e.target.value,
                  },
                })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledLabel>
              メールアドレス
              <StyledInput
                name='address_email'
                data-key='address'
                data-prop-id='email'
                value={ resume.values.address.email }
                onChange={ (e) => dispatch(updateValues({
                  address: {
                    ...resume.values.address,
                    email: e.target.value,
                  },
                })) }
              />
            </StyledLabel>
          </EditorRow>

          <EditorRow>
            <StyledHeading size="md">
              連絡先
            </StyledHeading>

            <CheckboxWithLabel
              label="連絡先を履歴書に表示する"
              name="is_contact_visible"
              data-key='isContactVisible'
              value={ resume.isContactVisible }
              color="tertiary"
              labelColor="tertiary"
              onChange={ (e, newValue) => dispatch(updateResume({ isContactVisible: newValue })) }
            />
          </EditorRow>

          {
            resume.isContactVisible && (
              <>
                <EditorRow>
                  <StyledLabel>
                    連絡先郵便番号
                    <StyledInput
                      name='contact_address_postal_code'
                      data-key='contactAddress'
                      data-prop-id='postalCode'
                      value={ resume.values.contactAddress.postalCode }
                      maxLength={ 7 }
                      onChange={ (e) => dispatch(updateValues({
                        contactAddress: {
                          ...resume.values.contactAddress,
                          postalCode: e.target.value,
                        },
                      })) }
                    />
                  </StyledLabel>
                </EditorRow>

                <EditorRow>
                  <StyledLabel>
                    連絡先ふりがな
                    <StyledInput
                      name='contact_address_line1_ruby'
                      data-key='contactAddress'
                      data-prop-id='line1Ruby'
                      value={ resume.values.contactAddress.line1Ruby }
                      onChange={ (e) => dispatch(updateValues({
                        contactAddress: {
                          ...resume.values.contactAddress,
                          line1Ruby: e.target.value,
                        },
                      })) }
                    />
                  </StyledLabel>
                </EditorRow>

                <EditorRow>
                  <StyledLabel>
                    連絡先住所
                    <StyledInput
                      name='contact_address_line1'
                      data-key='contactAddress'
                      data-prop-id='line1'
                      value={ resume.values.contactAddress.line1 }
                      onChange={ (e) => dispatch(updateValues({
                        contactAddress: {
                          ...resume.values.contactAddress,
                          line1: e.target.value,
                        },
                      })) }
                    />
                  </StyledLabel>
                </EditorRow>

                <EditorRow>
                  <StyledLabel>
                    連絡先ふりがな
                    <StyledInput
                      name='contact_address_line2_ruby'
                      data-key='contactAddress'
                      data-prop-id='line2Ruby'
                      value={ resume.values.contactAddress.line2Ruby }
                      onChange={ (e) => dispatch(updateValues({
                        contactAddress: {
                          ...resume.values.contactAddress,
                          line2Ruby: e.target.value,
                        },
                      })) }
                    />
                  </StyledLabel>
                </EditorRow>

                <EditorRow>
                  <StyledLabel>
                    連絡先建物名・部屋番号等
                    <StyledInput
                      name='contact_address_line2'
                      data-key='contactAddress'
                      data-prop-id='line2'
                      value={ resume.values.contactAddress.line2 }
                      onChange={ (e) => dispatch(updateValues({
                        contactAddress: {
                          ...resume.values.contactAddress,
                          line2: e.target.value,
                        },
                      })) }
                    />
                  </StyledLabel>
                </EditorRow>

                <EditorRow>
                  <StyledLabel>
                    連絡先電話番号
                    <StyledInput
                      name='contact_address_tel'
                      data-key='contactAddress'
                      data-prop-id='tel'
                      value={ resume.values.contactAddress.tel }
                      onChange={ (e) => dispatch(updateValues({
                        contactAddress: {
                          ...resume.values.contactAddress,
                          tel: e.target.value,
                        },
                      })) }
                    />
                  </StyledLabel>
                </EditorRow>

                <EditorRow>
                  <StyledLabel>
                    連絡先メールアドレス
                    <StyledInput
                      name='contact_address_email'
                      data-key='contactAddress'
                      data-prop-id='email'
                      value={ resume.values.contactAddress.email }
                      onChange={ (e) => dispatch(updateValues({
                        contactAddress: {
                          ...resume.values.contactAddress,
                          email: e.target.value,
                        },
                      })) }
                    />
                  </StyledLabel>
                </EditorRow>
              </>
            )
          }

          <EditorRow $direction="row" $justifyContent="space-between">
            <StyledHeading size="md">
              学歴
            </StyledHeading>

            <Button
              styleType="solid"
              color="tertiary"
              size="sm"
              onClick={ () => dispatch(addToEntities({ key: 'educations', data: structuredClone(EMPTY_YEAR_MONTH_DATA) })) }
            >
              追加
            </Button>
          </EditorRow>

          {
            resume.values.educations.ids.map((eduId) => {
              const edu = resume.values.educations.entities[eduId as keyof typeof resume.values.educations.entities];
              
              return <YearMonthContentEditorRow
                key={ eduId }
                $sectionKey="educations"
                $entityId={ eduId }
                $year={ edu.year }
                $month={ edu.month }
                $content={ edu.content }
                onChange={ (newEntity: { year: string; month: string; content: string }) => {
                  dispatch(updateEntities({
                    key: 'educations',
                    id: eduId,
                    data: newEntity,
                  }));
                } }
                onRemove={ () => showConfirmModal(
                  () => {
                    dispatch(removeFromEntities({ key: 'educations', id: eduId }));
                  },
                  '学歴の項目削除',
                  `「${ edu.year || '-' }年 ${ edu.month || '-' }月 ${ edu.content || '' }」の項目を削除しますか？`
                ) }
              />;
            })  
          }

          <EditorRow $direction="row" $justifyContent="space-between">
            <StyledHeading size="md">
              職歴
            </StyledHeading>

            <Button
              styleType="solid"
              color="tertiary"
              size="sm"
              onClick={ () => dispatch(addToEntities({ key: 'experiences', data: structuredClone(EMPTY_YEAR_MONTH_DATA) })) }
            >
              追加
            </Button>
          </EditorRow>

          {
            resume.values.experiences.ids.map((expId) => {
              const exp = resume.values.experiences.entities[expId as keyof typeof resume.values.experiences.entities];
              
              return <YearMonthContentEditorRow
                key={ expId }
                $sectionKey="experiences"
                $entityId={ expId }
                $year={ exp.year }
                $month={ exp.month }
                $content={ exp.content }
                onChange={ (newEntity: { year: string; month: string; content: string }) => {
                  dispatch(updateEntities({
                    key: 'experiences',
                    id: expId,
                    data: newEntity,
                  }));
                } }
                onRemove={ () => showConfirmModal(
                  () => {
                    dispatch(removeFromEntities({ key: 'experiences', id: expId }));
                  },
                  '職歴の項目削除',
                  `「${ exp.year || '-' }年 ${ exp.month || '-' }月 ${ exp.content || '' }」の項目を削除しますか？`
                ) }
              />;
            })
          }

          <EditorRow $direction="row" $justifyContent="space-between">
            <StyledHeading size="md">
              資格・免許
            </StyledHeading>

            <Button
              styleType="solid"
              color="tertiary"
              size="sm"
              onClick={ () => dispatch(addToEntities({ key: 'certifications', data: structuredClone(EMPTY_YEAR_MONTH_DATA) })) }
            >
              追加
            </Button>
          </EditorRow>

          {
            resume.values.certifications.ids.map((certId) => {
              const cert = resume.values.certifications.entities[certId as keyof typeof resume.values.certifications.entities];
              
              return <YearMonthContentEditorRow
                key={ certId }
                $sectionKey="certifications"
                $entityId={ certId }
                $year={ cert.year }
                $month={ cert.month }
                $content={ cert.content }
                onChange={ (newEntity: { year: string; month: string; content: string }) => {
                  dispatch(updateEntities({
                    key: 'certifications',
                    id: certId,
                    data: newEntity,
                  }));
                } }
                onRemove={ () => showConfirmModal(
                  () => {
                    dispatch(removeFromEntities({ key: 'certifications', id: certId }));
                  },
                  '資格・免許の項目削除',
                  `「${ cert.year || '-' }年 ${ cert.month || '-' }月 ${ cert.content || '' }」の項目を削除しますか？`
                ) }
              />;
            })
          }

          <EditorRow $direction="row" $justifyContent="space-between">
            <StyledHeading size="md">
              カスタム項目
            </StyledHeading>

            <Button
              styleType="solid"
              color="tertiary"
              size="sm"
              onClick={ () => dispatch(addToEntities({ key: 'customs', data: { label: '', content: '' } })) }
            >
              項目を追加
            </Button>
          </EditorRow>

          {
            resume.values.customs.ids.map((cusId) => {
              const custom = resume.values.customs.entities[cusId as keyof typeof resume.values.customs.entities];
              return (
                <EditorRow key={ cusId }>
                  <StyledLabel>
                    ラベル
                    <StyledInput
                      name={ `customs_${ cusId }_label` }
                      data-key='customs'
                      data-prop-id={ cusId }
                      data-entity-key='label'
                      value={ custom.label }
                      onChange={ (e) => dispatch(updateEntities({
                        key: 'customs',
                        id: cusId,
                        data: {
                          ...custom,
                          label: e.target.value,
                        },
                      })) }
                    />
                  </StyledLabel>

                  <StyledLabel>
                    内容
                    <StyledInput
                      name={ `customs_${ cusId }_content` }
                      data-key='customs'
                      data-prop-id={ cusId }
                      data-entity-key='content'
                      value={ custom.content }
                      onChange={ (e) => dispatch(updateEntities({
                        key: 'customs',
                        id: cusId,
                        data: {
                          ...custom,
                          content: e.target.value,
                        },
                      })) }
                    />
                  </StyledLabel>

                  <EditorRowInner $justifyContent="flex-end">
                    <Button
                      styleType="text"
                      color="tertiary"
                      size="sm"
                      onClick={ () => showConfirmModal(
                        () => {
                          dispatch(removeFromEntities({ key: 'customs', id: cusId }));
                        },
                        'カスタム項目の削除',
                        `「${ custom.label || '-' }」の項目を削除しますか？`
                      ) }
                    >
                      項目を削除
                    </Button>
                  </EditorRowInner>
                </EditorRow>
              );
            })
          }

        </ResumeEditorBody>
      </ResumeEditorInnerWrapper>

      <Modal ref={ modalRef } />
    </ResumeEditorWrapper>
  );
});

const YearMonthContentEditorRow = (props: {
  $sectionKey: 'educations' | 'experiences' | 'certifications';
  $entityId: string;
  $year: string;
  $month: string;
  $content: string;
  onChange: (newEntity: { year: string; month: string; content: string }) => void;
  onRemove: () => void;
}) => {
  const {
    $sectionKey,
    $entityId,
    $year,
    $month,
    $content,
    onChange,
    onRemove,
  } = props;

  return (
    <EditorRow>
      <EditorRowInner>
        <MonthInput
          name={ `${ $sectionKey }_${ $entityId }_select` }
          value={ { year: $year, month: $month } }
          dataYear={ {
            'data-key': $sectionKey,
            'data-prop-id': $entityId,
            'data-entity-key': 'year',
          } }
          dataMonth={ {
            'data-key': $sectionKey,
            'data-prop-id': $entityId,
            'data-entity-key': 'month',
          } }
          onChange={({ dateString, ...newValue }) => onChange({ ...newValue, content: $content })}
        />

        <Button
          styleType="text"
          color="tertiary"
          size="sm"
          onClick={ () => {onRemove() } }
        >
          削除
        </Button>
      </EditorRowInner>

      <StyledInput
        name={ `${ $sectionKey }_${ $entityId }_content` }
        value={ $content }
        data-key={ $sectionKey }
        data-prop-id={ $entityId }
        data-entity-key="content"
        onChange={ (e) => onChange({ year: $year, month: $month, content: e.target.value }) }
      />
    </EditorRow>
  );
};
