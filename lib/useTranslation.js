'use client';
import { useTranslation as useTranslationBase } from 'react-i18next';

const useTranslation = (ns = 'common') => {
  return useTranslationBase(ns);
};

export default useTranslation
