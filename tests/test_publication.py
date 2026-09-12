"""Offline refusal-rule tests. These do not certify authenticated GitHub transport."""
import importlib.util
from pathlib import Path
import unittest
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('publisher',ROOT/'tools/publish_github.py')
p=importlib.util.module_from_spec(spec);spec.loader.exec_module(p)
SHA='a'*40
class PublicationRules(unittest.TestCase):
 def test_firstlight_allowed(self):self.assertEqual(p.validate_target('xnuonux/eternities-firstlight'),'xnuonux/eternities-firstlight')
 def test_heaven_allowed(self):self.assertEqual(p.validate_target('xnuonux/eternities-heaven'),'xnuonux/eternities-heaven')
 def test_other_repo_refused(self):
  with self.assertRaises(ValueError):p.validate_target('xnuonux/luna-2')
 def test_other_owner_refused(self):
  with self.assertRaises(ValueError):p.validate_target('other/eternities-firstlight')
 def test_empty_remote(self):self.assertFalse(p.validate_remote_refs('',SHA))
 def test_identical_main(self):self.assertTrue(p.validate_remote_refs(SHA+'\trefs/heads/main\n',SHA))
 def test_different_main_refused(self):
  with self.assertRaises(ValueError):p.validate_remote_refs('b'*40+'\trefs/heads/main\n',SHA)
 def test_other_branch_refused(self):
  with self.assertRaises(ValueError):p.validate_remote_refs(SHA+'\trefs/heads/dev\n',SHA)
 def test_nonempty_extra_ref_refused(self):
  with self.assertRaises(ValueError):p.validate_remote_refs(SHA+'\trefs/heads/main\n'+SHA+'\trefs/tags/v1\n',SHA)
 def test_invalid_response_refused(self):
  with self.assertRaises(ValueError):p.validate_remote_refs('not a valid ref',SHA)
if __name__=='__main__':unittest.main()
